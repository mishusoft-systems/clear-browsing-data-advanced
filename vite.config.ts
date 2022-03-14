// vite.config.ts
// External dependencies
import {defineConfig} from "vite";
import {resolve}      from "path";

// Third party dependencies
import webExtension from "vite-plugin-web-extension";
import copy           from "rollup-plugin-copy"

// Internal dependencies
import * as packageJson from "./package.json";
import defaultManifestObject from "./src/manifest";

export default defineConfig(
    {
        root: "src",
        // Configure our outputs - nothing special, this is normal vite config
        build: {
            minify: "terser",
            outDir: resolve(__dirname, "dist"),
            emptyOutDir: true,
        },
        // Add the webExtension plugin
        plugins: [
            webExtension(
                {
                    manifest: () => {
                        // Generate your manifest
                        return {
                            name: packageJson.name.split('-').map(item =>`${item[0].toUpperCase()}${item.slice(1).toLowerCase()}`).join(" "),
                            description:packageJson.description,
                            version: packageJson.version,
                            author:packageJson.author.name,
                            homepage_url:packageJson.homepage,
                            ...(defaultManifestObject),
                        };
                    },
                    //manifest: resolve(__dirname, "src/manifest.json"),
                    assets: "assets",
                    browser: process.env.TARGET_BROWSER,
                }
            ),
            // Copy pre- and post-build files
            copy(
                {
                    targets: [
                        {src: "src/_locales/*", dest: "dist/_locales"},
                    ],
                    hook: "writeBundle",
                    // verbose: true,
                }
            ),
        ],
    }
);