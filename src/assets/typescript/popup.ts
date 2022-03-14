/**
 * IP Info Plus
 * Developer: Al-Amin Ahamed
 * Website: https://www.mishusoft.com
 * Home: https://mishusoft.com/browser/addons/ipinfoplus/
 * license : GPL-3.0-only
 * */
/**
 * IP Info Plus
 * Developer: Al-Amin Ahamed
 * Website: https://www.mishusoft.com
 * Home: https://mishusoft.com/brower/addons/ipinfoplus/
 * license : GPL-3.0-only
 * */


// https://pretagteam.com/question/add-a-separate-html-file-into-createreactapp

import {sendRequest} from "./includes/lib-functions-background";
import {captureElementById, createElement} from "./includes/lib-functions";

const ipd: any = captureElementById('ipd-address');
const ipb: any = captureElementById('ipd-search-btn');
const ipl: any = captureElementById('ip-info-plus-app-bottom');
const ipt: any = captureElementById('ip-info-plus-app-data-table');


function getIPInfo() {
    console.log('test')
    ipd.style = 'width:59% !important;';
    ipb.value = 'Getting data..';
    ipl.textContent = 'Loading...';
    ipt.setAttribute('style', 'display:none;');
    sendRequest({
        method: "GET",
        url: 'https://www.mishusoft.com/api/tools/ipinfo',
        async: true,
        header: [{name: "Accept", value: "application/json"}]
    }, function (IpDataReply: any) {
        ipd.style = 'width:71% !important;';
        ipb.value = 'Search';
        captureElementById('ip-info-plus-app-data-table').removeAttribute('style');
        ipl.textContent = 'IP INFORMATION:';
        captureElementById('ipd-address').value = IpDataReply.ip;
        captureElementById('client-ip').textContent = IpDataReply.ip;
        captureElementById('client-visual-location').href = 'https://www.google.com/maps/@' + IpDataReply.latitude + ',' + IpDataReply.longitude + ',19z';
        captureElementById('client-city').textContent = IpDataReply.city;
        captureElementById('client-region').textContent = IpDataReply.region;
        captureElementById('client-country').textContent = IpDataReply.country_name + ' (' + IpDataReply.country_code + ') ';
        let country_flag = createElement([{
            'img': {
                'style': 'width: 10px;height: 8px;',
                'src': IpDataReply.flag,
                'alt': 'FLAG'
            }
        }]);
        captureElementById('client-country').appendChild(country_flag);
        captureElementById('client-continent-name').textContent = IpDataReply.continent_name + ' (' + IpDataReply.continent_code + ')';
        captureElementById('client-post').textContent = IpDataReply.postal;
        captureElementById('client-asn-name').href = 'https://' + IpDataReply.asn.domain;
        captureElementById('client-asn-name').textContent = IpDataReply.asn.name + ' [' + IpDataReply.asn.type + ']';
        let language = '';
        for (let n in IpDataReply.languages) {
            language += IpDataReply.languages[n].name + '[' + IpDataReply.languages[n].native + ']; ';
        }
        captureElementById('client-language').textContent = language;
        captureElementById('client-currency-name').textContent = IpDataReply.currency.name;
        captureElementById('client-currency-code').textContent = IpDataReply.currency.code;
        captureElementById('client-currency-symbol').textContent = IpDataReply.currency.symbol;
        captureElementById('client-time-zone-name').textContent = IpDataReply.time_zone.name;
        captureElementById('client-time-zone-abbr').textContent = IpDataReply.time_zone.abbr;
        captureElementById('client-time-zone-offset').textContent = IpDataReply.time_zone.offset;
        captureElementById('client-time-zone-is-dist').textContent = IpDataReply.time_zone.is_dst;
        captureElementById('client-time-zone-current-time').textContent = IpDataReply.time_zone.current_time;
    });
}

getIPInfo();
ipd.addEventListener('change', getIPInfo, false);
ipb.addEventListener('click', getIPInfo, false);

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);
console.log('page ready')