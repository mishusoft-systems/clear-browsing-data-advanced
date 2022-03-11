const fs = require('fs');
const path = require('path');
const {parseSemVer} = require('semver-parser');

function main() {
    console.log('Reading version number in package...');

    // Read version
    const packageJson = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../..', 'package.json'), 'utf8')
    );
    const originalVersionString = packageJson.version;
    if (!originalVersionString) {
        console.error('Could not find version in package.json');
        process.exit(1);
    }
    console.log(`  Version in package.json: ${packageJson.version}`);

    // Parse it
    const {major, minor, patch, pre, matches} =
        parseSemVer(originalVersionString);
    if (!matches) {
        console.error(`Could not parse version ${originalVersionString}`);
        process.exit(1);
    }


    console.log('Synchronizing version number in manifest...');
    // Generate updated version info
    const manifestVersionInfo = pre
        ? `/*#if supports_alpha_version*/
  "version": "${major}.${minor}.${patch}${pre}",
  /*#else*/
  "version": "${major}.${minor}.${patch}",
  "version_name": "${originalVersionString}",
  /*#endif*/`
        : `"version": "${major}.${minor}.${patch}",`;

    // Update the manifest
    const manifestPath = path.join(__dirname, '..', 'manifest.json.src');
    const manifestSrc = fs.readFileSync(manifestPath, 'utf8');
    const existingManifestVersionInfo = /(\/\*#if supports_alpha_version\*\/.*?\/\*#endif\*\/)|("version": "\d+\.\d+\.\d+",)/s;
    if (!manifestSrc.match(existingManifestVersionInfo)) {
        console.error('Failed to find existing version information in manifest');
        process.exit(1);
    }
    const updatedManifestSrc = manifestSrc.replace(
        existingManifestVersionInfo,
        manifestVersionInfo
    );

    // Write the result
    fs.writeFileSync(manifestPath, updatedManifestSrc, 'utf8');
    console.log(`  Wrote result to ${manifestPath}`);


    console.log('Synchronizing version number in DB...');
    // Generate updated version info
    const dbVersionInfo = pre
        ? `"version": "${major}.${minor}.${patch}${pre}"`
        : `"version": "${major}.${minor}.${patch}",`;

    // Update the DB
    const dbPath = path.join(__dirname, '../assets/ts/', 'db.ts');
    const dbSrc = fs.readFileSync(dbPath, 'utf8');
    const existingDbVersionInfo = /("version": ".*?",)/s;
    if (!dbSrc.match(existingDbVersionInfo)) {
        console.error('Failed to find existing version information in DB');
        process.exit(1);
    }
    const updatedDbSrc = dbSrc.replace(
        existingDbVersionInfo,
        dbVersionInfo
    );

    // Write the result
    fs.writeFileSync(dbPath, updatedDbSrc, 'utf8');
    console.log(`  Wrote result to ${dbPath}`);
}

main();
