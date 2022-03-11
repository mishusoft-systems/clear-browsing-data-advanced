/**
 * IP Info Plus
 * Developer: Al-Amin Ahamed
 * Website: https://www.mishusoft.com
 * Home: https://mishusoft.com/brower/addons/ipinfoplus/
 * license : GPL-3.0-only
 * */


/*communication channel*/
// @ts-ignore
export let acsComPortFront = browser.runtime.connect({name: 'acs-messaging-port'});
/*communication channel*/



export function webMessageReceiver(type: string, callback: any): any {
    window.addEventListener("message", function (event: MessageEvent) {
        /*#!if debug===true*/
        /*console.log(event);*/
        /*#!endif*/
        if (event && event.source === window && event.data && event.data.type) {
            if (event.data.type && event.data.type === type) {
                /*#!if debug===true*/
                /*alert(event.data);*/
                if (callback) {
                    callback(event.data.payload)
                }
                /*#!if debug===true*/
                /*else {
                    console.log(event.data.licence);
                }*/
                /*#!endif*/
            }

            /*#!if debug===true*/
            /*else {
                console.error('No resolver for event type!!')
            }*/
            /*#!endif*/
        }
        /*#!if debug===true*/
        /*else {
            console.error('Unknown web message!!')
        }*/
        /*#!endif*/
    });
}
