// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json
// https://developer.chrome.com/docs/extensions/mv3/manifest/
export default {
    "default_locale": "en",
    "icons": {
        "16": "assets/images/icon-16.svg",
        "48": "assets/images/icon-48.svg",
        "128": "assets/images/icon-128.svg"
    },
    "{{chrome}}.manifest_version": 3,
    "{{firefox}}.manifest_version": 2,
    "{{chrome}}.action": {
        "default_icon": {
            "16": "assets/images/icon-16.svg",
            "48": "assets/images/icon-48.svg",
            "128": "assets/images/icon-128.svg"
        },
        "default_title": "__MSG_command_toggle_enabled__",
        "default_popup": "popup/index.html"
    },
    "{{firefox}}.browser_action": {
        "default_icon": "assets/images/icon-128.svg",
        "default_popup": "popup/index.html",
        "default_title": "__MSG_command_toggle_enabled__",
        "browser_style": false
    },
    "{{firefox}}.browser_specific_settings": {
        "gecko": {
            "id": "cache-clear.addon.firefox@developer.mishuoft.com"
        }
    },
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands
    "{{firefox}}.commands": {
        "toggle-feature": {
            "suggested_key": {
                "default": "Ctrl+Shift+Y",
                "linux": "Ctrl+Shift+Y",
                "mac": "Command+Shift+Y",
            },
            "description": "Clear browser cache"
        }
    },
    // https://developer.chrome.com/docs/extensions/reference/commands/
    "{{chrome}}.commands": {
        "run-clean-cache": {
            "suggested_key": {
                "default": "Ctrl+Shift+Y",
                "mac": "Command+Shift+Y",
            },
            "description": "Clear browser cache.",
            "global": true
        },
    },
    "background": {
        "{{firefox}}.scripts": ["background/index.ts"],
        "{{chrome}}.service_worker": "background/index.ts"
    },
    "permissions": ["activeTab", "storage", "{{firefox}}.<all_urls>"],
    // https://content-security-policy.com/
    "{{firefox}}.content_security_policy": "script-src 'self'; object-src 'self'",
    // https://developer.chrome.com/docs/extensions/mv3/manifest/sandbox/
    "{{chrome}}.content_security_policy": {
        "extension_pages": "script-src 'self'; object-src 'self'",
    }
}