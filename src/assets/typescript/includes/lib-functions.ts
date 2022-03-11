/**
 * IP Info Plus
 * Developer: Al-Amin Ahamed
 * Website: https://www.mishusoft.com
 * Home: https://mishusoft.com/brower/addons/ipinfoplus/
 * license : GPL-3.0-only
 * */


export function retrieveDate(presetDate: string): string {
    let d, hours, format;
    if (presetDate) {
        d = new Date(presetDate);
    } else {
        d = new Date();
    }

    let months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if (d.getHours() === 0) {
        hours = '12';
    } else { // @ts-ignore
        if (d.getHours() >= '12') {
            hours = d.getHours() - 12;
        } else {
            hours = d.getHours();
        }
    }

    // @ts-ignore
    if (d.getHours() >= '12') {
        format = 'PM';
    } else {
        format = 'AM';
    }
    return (days[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ', ' + hours + ':' + d.getMinutes() + ' ' + format);
}
export function checkDuplicate(str: string) {
    for (let i = 0; i < str.length; i++) {
        let re = new RegExp("[^" + str[i] + "]", "g");
        if (str.replace(re, "").length >= 2) {
            return true;
        }
    }
    return false;
}


export function createElement(node_data: any) {
    let element, i, j, k;
    for (i in node_data) {
        let data: any = node_data[i];
        for (j in data) {
            let elementName = j;
            let elementData = data[j];
            element = document.createElement(elementName);
            for (k in elementData) {
                let element_attribute = k;
                let element_attribute_value = elementData[k];
                element.setAttribute(element_attribute, element_attribute_value);
            }
        }
    }
    return (element as HTMLElement);
}

export function captureElementById(elementId: string): any {
    if (document.querySelector('#' + elementId) !== null) {
        return document.querySelector('#' + elementId) as HTMLElement;
    }
}

export function captureElementByClassName(ClassName: string): any {
    if (document.querySelector('.' + ClassName) !== null) {
        return document.querySelector('.' + ClassName) as HTMLElement;
    }
}

export function captureElementByTagName(TagName: string): any {
    if (document.querySelector(TagName) !== null) {
        return document.querySelector(TagName) as HTMLElement;
    }
}

export function getLoggedInUsersEarned() {
    return (captureElementById('moneycount') as HTMLDivElement).textContent?.replace(/\s\$/g, '').replace(/\./, '');
}

export function getLoggedInUsersReferralsAttracted() {
    return (captureElementById('refcount') as HTMLDivElement).textContent?.replace(/\s/g, '');
}

export function getLoggedInUsersEarnedByReferrals() {
    return (captureElementById('refmoney') as HTMLDivElement).textContent?.replace(/\s\$/g, '').replace(/\./, '');
}

export function currencyFormat(num: number) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

export function numberFormat(num: string) {
    return (num as string).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

export function startTimer(duration: any, display: HTMLElement) {
    var timer = duration, /*hours,*/ minutes, seconds;
    /*let seconds:any = parseInt(String(duration), 10);*/
    setInterval(function () {
        /*let days: any = Math.floor(seconds / (3600 * 24));
        seconds -= days * 3600 * 24;
        let hours: any = Math.floor(seconds / 3600);
        seconds -= hours * 3600;
        let minutes: any = Math.floor(seconds / 60);
        seconds -= minutes * 60;*/

        /*hours = parseInt(String(timer / 3600), 10);*/
        minutes = parseInt(String(timer / 60), 10);
        seconds = parseInt(String(timer % 60), 10);

        /*hours = hours < 10 ? "0" + hours : hours;*/
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = /*days + " Days, " + hours + " Hours, " +*/ minutes + " Minutes, " + seconds + " Seconds";

        if (--timer < 0) {
            /*alert(timer)*/
            timer = duration;
        }
    }, 1000);
}