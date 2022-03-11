// Look for a --firefox <path> argument
const firefoxIndex = process.argv.indexOf('--firefox');
const firefox = (firefoxIndex !== -1 && firefoxIndex < process.argv.length - 1) ? process.argv[firefoxIndex + 1] : undefined;

// Likewise for firefoxProfile
const firefoxProfileIndex = process.argv.indexOf('--firefoxProfile');
const firefoxProfile = (firefoxProfileIndex !== -1 && firefoxProfileIndex < process.argv.length - 1) ? process.argv[firefoxProfileIndex + 1] : undefined;

export default {firefox, firefoxProfile}

