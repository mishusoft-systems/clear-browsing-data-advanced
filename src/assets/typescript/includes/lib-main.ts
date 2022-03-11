/**
 * IP Info Plus
 * Developer: Al-Amin Ahamed
 * Website: https://www.mishusoft.com
 * Home: https://mishusoft.com/brower/addons/ipinfoplus/
 * license : GPL-3.0-only
 * */


/*required variables*/
export let globalAppMonitorURL: string;
export let appPaymentURL: string;


/*initialize on extension installed*/
/*#!if ENV === 'production'*/
globalAppMonitorURL = 'https://www.mishusoft.com/monitor/browser/';
appPaymentURL = 'https://www.mishusoft.com/payment/';
/*#!else*/
globalAppMonitorURL = 'http://localhost/monitor/browser/';
appPaymentURL = 'http://localhost/payment/';
/*#!endif*/
/*required variables*/


/*required functions*/