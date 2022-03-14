import browser from "webextension-polyfill"

browser.runtime.onInstalled.addListener(() => {

    console.log('installed')
    browser.contextMenus.create({
        "id": "sampleContextMenu",
        "title": "Sample Context Menu",
        "contexts": ["tools_menu"]
    });
});

console.log('test')