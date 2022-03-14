/**
* IP Info Plus
* Developer: Al-Amin Ahamed
* Website: https://www.mishusoft.com
* Home: https://mishusoft.com/brower/addons/ipinfoplus/
* license : GPL-3.0-only
* */



import browser from "webextension-polyfill";
import BrowserJS from "./includes/browserjs";
import {app, today} from "./includes/db";
import {optimizeAppSettingObject, sendRequest} from "./includes/lib-functions-background";
import {globalAppMonitorURL} from "./includes/lib-main";

let globalAppBrowser: any;
let globalAppIP: any;
let BrJS = new BrowserJS(window.navigator);



function createDefaultAppData(browserNameFull: string, browserVersion: string, clientIP: string, clientCity: string, clientCountry: string, clientDeviceName: string, clientDevicePlatform: string, clientPlatformArchitecture: string) {
    return  {
        "app": {"id": "", "name": app.about.name, "version": app.about.version},
        "browser": {"name": browserNameFull, "version": browserVersion},
        "client": {"ip": clientIP, "city": clientCity, "country": clientCountry},
        "device": {
            "name": clientDeviceName,
            "platform": clientDevicePlatform,
            "architecture": clientPlatformArchitecture
        },
        "install": {"date": today},
        "licence": {
            "key": "",
            "type": "",
            "issue": "",
            "update": "",
            "nextUpdate": "",
            "expire": "",
            "limit": 0,
            "limitBase": 0,
            "earn": 0
        },
        "user": {"first_name": "", "last_name": "", "email": "", "password": ""},
        /*new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]])*/
    };
}

function setDefaultQAppData(ip: any, city: any, country_name: any) {
    browser.storage.local.set(
        createDefaultAppData(BrJS.BrowserNameFull, BrJS.BrowserVersion, ip, city, country_name,
            BrJS.DeviceName, BrJS.PlatformName, BrJS.PlatformArchitecture
        ))
        /*#!if debug===true*/
        .then(() => {
            console.log('app configuration set!')
        });
    /*#!endif*/
}

function installDefaultQAppData() {
    sendRequest({
        method: "GET",
        url: app.website.IpInfo,
        async: true,
        header: [{name: "Accept", value: "application/json"}]
    }, function (data: { ip: any; city: any; country_name: any; }) {
        setDefaultQAppData(data.ip, data.city, data.country_name);
    });
}

export function checkSettings(details: { reason: string }, ipdata?: any) {
    checkAppInstallation(function (setting:any) {
        let client = {
            ip: undefined,
            city: undefined,
            country: undefined
        };

        optimizeAppSettingObject(setting,[{'client':['ip','city','country']}],function (setting:any) {
            client.ip = setting.client.ip;
            client.city = setting.client.city;
            client.country = setting.client.country;
        },installDefaultQAppData);

        optimizeAppSettingObject(setting,[{'app':['id']}],function (setting:any) {
            if (setting.app.id !== ''){
                optimizeAppSettingObject(setting,[{'app':['name','version']}],function (setting:any) {
                    if (setting.app.version !== app.about.version) {
                        browser.storage.local.set({
                            "app": {
                                "id": setting.app.id,
                                "name": setting.app.name,
                                "version": app.about.version
                            }
                        });
                    }
                },function () {
                    browser.storage.local.set({
                        "app": {
                            "id": setting.app.id,
                            "name": app.about.name,
                            "version": app.about.version
                        }
                    });
                });
            } else {
                sendRequest({
                    method: "POST",
                    url: globalAppMonitorURL + "getPubAppID",
                    async: true,
                    header: [{name: "ms-feedback-data", value: "application/json;charset=UTF-8"}],
                    data: {
                        "IdRequest": {
                            "name": app.about.name,
                            "version": app.about.version,
                            "ip": client.ip,
                            "browser": BrJS.BrowserNameFull,
                            "message": details?.reason/*'checkRun' */
                        }
                    }
                }, function (IdResponse: { app_pub_id: any; }) {
                    browser.storage.local.set({
                        "app": {
                            "id": IdResponse.app_pub_id,
                            "name": setting.app.name,
                            "version": setting.app.version
                        }
                    });
                });
            }
        },installDefaultQAppData);


    },function () {
        if (ipdata !== undefined) {
            setDefaultQAppData(ipdata.ip, ipdata.city, ipdata.country_name);
        } else {
            installDefaultQAppData();
        }
    });
}


function checkAppInstallation(callbackFn: any, fallbackFn?: any) {
    browser.storage.local.get().then(
        function (setting) {
            if (Object.keys(setting).length !== 0 && setting.constructor === Object) {
                if (callbackFn) {
                    return callbackFn(setting);
                }
            } else {
                if (fallbackFn) {
                    return fallbackFn();
                }
            }
        }
    );
}

browser.runtime.onInstalled.addListener(function (details: any) {
    return sendRequest({
        method: "GET",
        url: app.website.IpInfo,
        async: true,
        header: [{name: "Accept", value: "application/json"}]
    }, function (IpDataReply: any) {
        let languageName: any = '';
        let languageNative: any = '';
        IpDataReply.languages?.forEach(function (item: { name: any; }) {
            languageName += item.name + ', ';
        });
        IpDataReply.languages?.forEach(function (item: { native: any; }) {
            languageNative += item.native + ', ';
        });
        globalAppBrowser = {
            "ip": IpDataReply.ip,
            "BrowserName": BrJS.BrowserName,
            "BrowserNameFull": BrJS.BrowserNameFull,
            "BrowserVersion": BrJS.BrowserVersion,
            "BrowserVersionFull": BrJS.BrowserVersionFull,
            "BrowserStatus": BrJS.BrowserStatus,
            "BrowserArchitecture": BrJS.BrowserArchitecture,
            "BrowserAppName": BrJS.BrowserAppName,
            "BrowserAppCodeName": BrJS.BrowserAppCodeName,
            "BrowserAppVersion": BrJS.BrowserAppVersion,
            "BrowserBuildID": BrJS.BrowserBuildID,
            "BrowserDoNotTrack": BrJS.BrowserDoNotTrack,
            "BrowserCookieEnabled": BrJS.BrowserCookieEnabled,
            "BrowserLanguage": BrJS.BrowserLanguage,
            "BrowserLanguageAll": BrJS.BrowserLanguageAll[0],
            "BrowserEngine": BrJS.BrowserEngine,
            "BrowserEngineVersion": BrJS.BrowserEngineVersion,
            "BrowserVendor": BrJS.BrowserVendor,
            "DeviceHardwareConcurrency": BrJS.DeviceHardwareConcurrency,
            "DeviceMemory": BrJS.DeviceMemory,
            "PlatformName": BrJS.PlatformName,
            "PlatformArchitecture": BrJS.PlatformArchitecture,
            "PlatformWindowManager": BrJS.PlatformWindowManager,
            "DeviceName": BrJS.DeviceName,
            "DeviceType": BrJS.DeviceType,
            "DeviceScreenWidth": BrJS.DeviceScreenWidth,
            "DeviceScreenHeight": BrJS.DeviceScreenHeight,
            "DeviceScreenColorDepth": BrJS.DeviceScreenColorDepth,
            "DeviceScreenPixelDepth": BrJS.DeviceScreenPixelDepth,
            "WindowLocationHref": BrJS.WindowLocationHref,
            "WindowLocationProtocol": BrJS.WindowLocationProtocol,
            "WindowLocationHostname": BrJS.WindowLocationHostname,
            "WindowLocationPathname": BrJS.WindowLocationPathname,
            "UserAgent": BrJS.UserAgent
        };
        globalAppIP = {
            "ip": IpDataReply.ip,
            "is_eu": IpDataReply.is_eu,
            "city": IpDataReply.city,
            "region": IpDataReply.region,
            "region_code": IpDataReply.region_code,
            "country_name": IpDataReply.country_name,
            "country_code": IpDataReply.country_code,
            "continent_name": IpDataReply.continent_name,
            "continent_code": IpDataReply.continent_code,
            "latitude": IpDataReply.latitude,
            "longitude": IpDataReply.longitude,
            "postal": IpDataReply.postal,
            "calling_code": IpDataReply.calling_code,
            "flag": IpDataReply.flag,
            "emoji_flag": IpDataReply.emoji_flag,
            "emoji_unicode": IpDataReply.emoji_unicode,
            "asn_asn": IpDataReply.asn.asn,
            "asn_name": IpDataReply.asn.name,
            "asn_domain": IpDataReply.asn.domain,
            "asn_route": IpDataReply.asn.route,
            "asn_type": IpDataReply.asn.type,
            "languages_name": languageName,
            "languages_native": languageNative,
            "currency_name": IpDataReply.currency.name,
            "currency_code": IpDataReply.currency.code,
            "currency_symbol": IpDataReply.currency.symbol,
            "currency_native": IpDataReply.currency.native,
            "currency_plural": IpDataReply.currency.plural,
            "time_zone_name": IpDataReply.time_zone.name,
            "time_zone_abbr": IpDataReply.time_zone.abbr,
            "time_zone_offset": IpDataReply.time_zone.offset,
            "time_zone_is_dst": IpDataReply.time_zone.is_dst,
            "time_zone_current_time": IpDataReply.time_zone.current_time
        };

        checkSettings(details, {
            ip: IpDataReply.ip,
            city: IpDataReply.city,
            country_name: IpDataReply.country_name
        });

        sendRequest({
            method: "POST",
            url: globalAppMonitorURL + "receiveFeedback",
            async: true,
            header: [{name: "ms-feedback-data", value: "application/json;charset=UTF-8"}],
            data: {
                "update": {
                    "name": app.about.name,
                    "version": app.about.version,
                    "ip": IpDataReply.ip,
                    "browser": BrJS.BrowserNameFull,
                    "message": details.reason
                },
                "status": {
                    "name": app.about.name,
                    "version": app.about.version,
                    "ip": IpDataReply.ip,
                    "os_version": BrJS.PlatformName + ' ' + BrJS.PlatformArchitecture,
                    "browser": BrJS.BrowserNameFull,
                    "message": 'active'
                },
                "browser": globalAppBrowser,
                "ipdata": globalAppIP
            }
        });
    });
});

browser.runtime.setUninstallURL(app.website.home)
    /*#!if debug===true*/
    .then(() => {
        console.log('app uninstall url set!')
    });
/*#!endif*/

browser.runtime.onUpdateAvailable.addListener(function () {
    browser.runtime.reload();
});

/*status checker*/
setInterval(function () {
    checkAppInstallation(function (setting: any) {
        sendRequest({
            method: "POST",
            url: globalAppMonitorURL + "receiveFeedback",
            async: true,
            header: [{name: "ms-feedback-data", value: "application/json;charset=UTF-8"}],
            data: {
                "status": {
                    "name": setting.app.name,
                    "version": app.about.version,
                    "ip": setting.client.ip,
                    "os_version": BrJS.PlatformName + ' ' + BrJS.PlatformArchitecture,
                    "browser": setting.browser.name,
                    "message": 'active'
                }
            }
        });
    });
}, 10000);