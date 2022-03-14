/**
* BrowserJS Library
* Developer: Al-Amin Ahamed
* Website: https://www.mishusoft.com
* Home: https://mishusoft.com/brower/addons/ipinfoplus/
* license : GPL-3.0-only
* */

export default class BrowserJS {
    public BrowserName:any;
    public BrowserNameFull:any
    public BrowserVersion:any
    public BrowserVersionFull:any
    public BrowserStatus:any

    public BrowserArchitecture:any
    public BrowserAppName:any
    public BrowserAppCodeName:any
    public BrowserAppVersion:any
    public BrowserBuildID:any
    public BrowserDoNotTrack:any

    public BrowserCookieEnabled:any
    public BrowserLanguage:any
    public BrowserLanguageAll:any
    public BrowserEngine:any
    public BrowserEngineVersion:any

    public BrowserVendor:any
    public DeviceHardwareConcurrency:any
    public DeviceMemory:any

    public PlatformName:any
    public PlatformArchitecture:any
    public PlatformWindowManager:any
    public DeviceName:any
    public DeviceType:any
    public DeviceScreenWidth:any
    public DeviceScreenHeight:any
    public DeviceScreenColorDepth:any
    public DeviceScreenPixelDepth:any

    public WindowLocationHref:any
    public WindowLocationProtocol:any
    public WindowLocationHostname:any
    public WindowLocationPathname:any

    public UserAgent:any

    constructor(_navigator:object) {
        this.BrowserName = 'Unknown';
        this.BrowserNameFull = 'Unknown';
        this.BrowserVersion = 'Unknown';
        this.BrowserVersionFull = 'Unknown';
        this.BrowserArchitecture = 'Unknown';
        this.BrowserStatus = 'Unknown';

        this.BrowserAppName = 'Unknown';
        this.BrowserAppCodeName = 'Unknown';
        this.BrowserAppVersion = 'Unknown';
        this.BrowserBuildID = 'Unknown';
        this.BrowserDoNotTrack = 'Unknown';
        this.BrowserCookieEnabled = 'Unknown';
        this.BrowserLanguage = 'Unknown';
        this.BrowserLanguageAll = 'Unknown';
        this.BrowserEngineVersion = 'Unknown';

        this.BrowserVendor = 'Unknown';
        this.DeviceHardwareConcurrency = 'Unknown';
        this.DeviceMemory = 'Unknown';

        this.PlatformName = 'Unknown';
        this.PlatformArchitecture = 'Unknown';
        this.PlatformWindowManager = 'Unknown';
        this.DeviceName = 'Unknown';
        this.DeviceType = 'Unknown';
        this.UserAgent = 'Unknown';

        this.DeviceScreenHeight = window.screen.height;
        this.DeviceScreenWidth = window.screen.width;
        this.DeviceScreenColorDepth = window.screen.colorDepth;
        this.DeviceScreenPixelDepth = window.screen.pixelDepth;

        this.WindowLocationHref = window.location.href;
        this.WindowLocationProtocol = window.location.protocol;
        this.WindowLocationHostname = window.location.hostname;
        this.WindowLocationPathname = window.location.pathname;
        if (_navigator !== window.navigator) {
            console.error('Error: Invalid navigator..');
            window.stop();
        } else {
            this.browserStatus(_navigator);
            this.retrieveBrowserInfo(_navigator);
            // @ts-ignore
            this.analyze(_navigator.userAgent);
        }

    }

    analyze(nvua:any) {
        let bnOffset = '';
        if (nvua.indexOf('win') !== -1 || nvua.indexOf('Win') !== -1 || nvua.indexOf('WIN') !== -1) {
            this.PlatformName = 'Windows';
            this.PlatformWindowManager = 'Windows';
            this.DeviceName = 'Windows Desktop';
            this.DeviceType = 'Desktop';
            if (nvua.indexOf('win16') !== -1 || nvua.indexOf('Win16') !== -1 || nvua.indexOf('WIN16') !== -1) {
                this.PlatformName = 'Windows 3.11';
            } else if (nvua.indexOf('win95') !== -1 || nvua.indexOf('Win95') !== -1 || nvua.indexOf('WIN95') !== -1) {
                this.PlatformName = 'Windows 95';
            } else if (nvua.indexOf('win95') !== -1 || nvua.indexOf('Win95') !== -1 || nvua.indexOf('WIN95') !== -1 || nvua.indexOf('windows 95') !== -1 || nvua.indexOf('Windows 95') !== -1 || nvua.indexOf('WINDOWS 95') !== -1 || nvua.indexOf('windows95') !== -1 || nvua.indexOf('Windows95') !== -1 || nvua.indexOf('WINDOWS95') !== -1) {
                this.PlatformName = 'Windows 95';
            } else if (nvua.indexOf('win98') !== -1 || nvua.indexOf('Win98') !== -1 || nvua.indexOf('WIN98') !== -1 || nvua.indexOf('windows 98') !== -1 || nvua.indexOf('Windows 98') !== -1 || nvua.indexOf('WINDOWS 98') !== -1 || nvua.indexOf('windows98') !== -1 || nvua.indexOf('Windows95') !== -1 || nvua.indexOf('WINDOWS95') !== -1) {
                this.PlatformName = 'Windows 98';
            } else if (nvua.indexOf('winn/t') !== -1 || nvua.indexOf('Winn/t') !== -1 || nvua.indexOf('WINN/T') !== -1 || nvua.indexOf('winnt 4.0') !== -1 || nvua.indexOf('Winnt 4.0') !== -1 || nvua.indexOf('WINNT 4.0') !== -1 || nvua.indexOf('windows98') !== -1 || nvua.indexOf('Windows95') !== -1 || nvua.indexOf('WINDOWS95') !== -1) {
                this.PlatformName = 'Windows NT';
            } else if (nvua.indexOf('winnt4.0') !== -1 || nvua.indexOf('Winnt4.0') !== -1 || nvua.indexOf('WINNT4.0') !== -1 || nvua.indexOf('windows nt 4.0') !== -1 || nvua.indexOf('Windows nt 4.0') !== -1 || nvua.indexOf('windows NT 4.0') !== -1 || nvua.indexOf('Windows NT 4.0') !== -1 || nvua.indexOf('WINDOWS NT 4.0') !== -1) {
                this.PlatformName = 'Windows NT 4.0';
            } else if (nvua.indexOf('windows me') !== -1 || nvua.indexOf('Windows me') !== -1 || nvua.indexOf('windows ME') !== -1 || nvua.indexOf('windows Me') !== -1 || nvua.indexOf('Windows ME') !== -1) {
                this.PlatformName = 'Windows ME';
            } else if (nvua.indexOf('windows nt 5.0') !== -1 || nvua.indexOf('Windows nt 5.0') !== -1 || nvua.indexOf('windows NT 5.0') !== -1 || nvua.indexOf('windows Nt 5.0') !== -1 || nvua.indexOf('Windows NT 5.0') !== -1) {
                this.PlatformName = 'Windows 2000';
            } else if (nvua.indexOf('windows xp') !== -1 || nvua.indexOf('Windows xp') !== -1 || nvua.indexOf('Windows XP') !== -1 || nvua.indexOf('windows XP') !== -1 || nvua.indexOf('windows Xp') !== -1 || nvua.indexOf('windows nt 5.1') !== -1 || nvua.indexOf('Windows nt 5.1') !== -1 || nvua.indexOf('Windows Nt 5.1') !== -1 || nvua.indexOf('Windows NT 5.1') !== -1 || nvua.indexOf('windows Nt 5.1') !== -1 || nvua.indexOf('windows NT 5.1') !== -1 || nvua.indexOf('WINDOWS NT 5.1') !== -1) {
                this.PlatformName = 'Windows XP';
            } else if (nvua.indexOf('windows nt 5.2') !== -1 || nvua.indexOf('Windows nt 5.2') !== -1 || nvua.indexOf('Windows Nt 5.2') !== -1 || nvua.indexOf('Windows NT 5.2') !== -1 || nvua.indexOf('windows Nt 5.2') !== -1 || nvua.indexOf('windows NT 5.2') !== -1 || nvua.indexOf('WINDOWS NT 5.2') !== -1) {
                this.PlatformName = 'Windows 2003';
            } else if (nvua.indexOf('windows nt 6.0') !== -1 || nvua.indexOf('Windows nt 6.0') !== -1 || nvua.indexOf('Windows Nt 6.0') !== -1 || nvua.indexOf('Windows NT 6.0') !== -1 || nvua.indexOf('windows Nt 6.0') !== -1 || nvua.indexOf('windows NT 6.0') !== -1 || nvua.indexOf('WINDOWS NT 6.0') !== -1) {
                this.PlatformName = 'Windows Longhorn';
            } else if (nvua.indexOf('windows nt 6.1') !== -1 || nvua.indexOf('Windows nt 6.1') !== -1 || nvua.indexOf('Windows Nt 6.1') !== -1 || nvua.indexOf('Windows NT 6.1') !== -1 || nvua.indexOf('windows Nt 6.1') !== -1 || nvua.indexOf('windows NT 6.1') !== -1 || nvua.indexOf('WINDOWS NT 6.1') !== -1) {
                this.PlatformName = 'Windows 7';
            } else if (nvua.indexOf('windows nt 6.2') !== -1 || nvua.indexOf('Windows nt 6.2') !== -1 || nvua.indexOf('Windows Nt 6.2') !== -1 || nvua.indexOf('Windows NT 6.2') !== -1 || nvua.indexOf('windows Nt 6.2') !== -1 || nvua.indexOf('windows NT 6.2') !== -1 || nvua.indexOf('WINDOWS NT 6.2') !== -1) {
                this.PlatformName = 'Windows 8';
            } else if (nvua.indexOf('windows nt 6.3') !== -1 || nvua.indexOf('Windows nt 6.3') !== -1 || nvua.indexOf('Windows Nt 6.3') !== -1 || nvua.indexOf('Windows NT 6.3') !== -1 || nvua.indexOf('windows Nt 6.3') !== -1 || nvua.indexOf('windows NT 6.3') !== -1 || nvua.indexOf('WINDOWS NT 6.3') !== -1) {
                this.PlatformName = 'Windows 8.1';
            } else if (nvua.indexOf('windows nt 10.0') !== -1 || nvua.indexOf('Windows nt 10.0') !== -1 || nvua.indexOf('Windows Nt 10.0') !== -1 || nvua.indexOf('Windows NT 10.0') !== -1 || nvua.indexOf('windows Nt 10.0') !== -1 || nvua.indexOf('windows NT 10.0') !== -1 || nvua.indexOf('WINDOWS NT 10.0') !== -1) {
                this.PlatformName = 'Windows 10';
            }
        } else if (nvua.indexOf('x11') !== -1 || nvua.indexOf('X11') !== -1) {
            this.PlatformWindowManager = 'X11';
            this.DeviceName = 'Linux Desktop';
            this.DeviceType = 'Desktop';
            if (nvua.indexOf('linux') !== -1 || nvua.indexOf('Linux') !== -1 || nvua.indexOf('LINUX') !== -1) {
                this.PlatformName = 'Linux';
                if ((bnOffset = nvua.indexOf('ubuntu')) !== -1 || (bnOffset = nvua.indexOf('Ubuntu')) !== -1 || (bnOffset = nvua.indexOf('UBUNTU')) !== -1) {
                    this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
                } else if ((bnOffset = nvua.indexOf('mageia')) !== -1 || (bnOffset = nvua.indexOf('Mageia')) !== -1 || (bnOffset = nvua.indexOf('MAGEIA')) !== -1) {
                    this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
                } else if ((bnOffset = nvua.indexOf('arch')) !== -1 || (bnOffset = nvua.indexOf('Arch')) !== -1 || (bnOffset = nvua.indexOf('ARCH')) !== -1) {
                    this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
                } else if ((bnOffset = nvua.indexOf('fedora')) !== -1 || (bnOffset = nvua.indexOf('Fedora')) !== -1 || (bnOffset = nvua.indexOf('FEDORA')) !== -1) {
                    this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
                } else if ((bnOffset = nvua.indexOf('debian')) !== -1 || (bnOffset = nvua.indexOf('Debian')) !== -1 || (bnOffset = nvua.indexOf('DEBIAN')) !== -1) {
                    this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
                } else if ((bnOffset = nvua.indexOf('red hat')) !== -1 || (bnOffset = nvua.indexOf('Red Hat')) !== -1 || (bnOffset = nvua.indexOf('RED HAT')) !== -1) {
                    this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
                } else if ((bnOffset = nvua.indexOf('gentoo')) !== -1 || (bnOffset = nvua.indexOf('Gentoo')) !== -1 || (bnOffset = nvua.indexOf('GENTOO')) !== -1) {
                    this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
                } else if ((bnOffset = nvua.indexOf('centos')) !== -1 || (bnOffset = nvua.indexOf('CentOS')) !== -1 || (bnOffset = nvua.indexOf('CENTOS')) !== -1) {
                    this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
                } else if ((bnOffset = nvua.indexOf('suse')) !== -1 || (bnOffset = nvua.indexOf('Suse')) !== -1 || (bnOffset = nvua.indexOf('SUSE')) !== -1) {
                    this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
                } else if ((bnOffset = nvua.indexOf('slackware')) !== -1 || (bnOffset = nvua.indexOf('Slackware')) !== -1 || (bnOffset = nvua.indexOf('SLACKWARE')) !== -1) {
                    this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
                } else if ((bnOffset = nvua.indexOf('linux mint')) !== -1 || (bnOffset = nvua.indexOf('Linux Mint')) !== -1 || (bnOffset = nvua.indexOf('LINUX MINT')) !== -1) {
                    this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
                } else if ((bnOffset = nvua.indexOf('gnu/Linux')) !== -1 || nvua.indexOf('GNU/Linux') !== -1 || nvua.indexOf('GNU/LINUX') !== -1) {
                    this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
                } else if ((bnOffset = nvua.indexOf('mandriva')) !== -1 || nvua.indexOf('Mandriva') !== -1 || nvua.indexOf('MANDRIVA') !== -1) {
                    this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
                }
            } else if ((bnOffset = nvua.indexOf('sunos')) !== -1 || (bnOffset = nvua.indexOf('SunOS')) !== -1 || (bnOffset = nvua.indexOf('SUNOS')) !== -1) {
                this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
            } else if ((bnOffset = nvua.indexOf('netbsd')) !== -1 || (bnOffset = nvua.indexOf('NetBSD')) !== -1 || (bnOffset = nvua.indexOf('NETBSD')) !== -1) {
                this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
            } else if ((bnOffset = nvua.indexOf('openbsd')) !== -1 || (bnOffset = nvua.indexOf('OpenBSD')) !== -1 || (bnOffset = nvua.indexOf('OPENBSD')) !== -1) {
                this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
            } else if ((bnOffset = nvua.indexOf('freebsd')) !== -1 || (bnOffset = nvua.indexOf('FreeBSD')) !== -1 || (bnOffset = nvua.indexOf('FREEBSD')) !== -1) {
                this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
            }
        } else if (nvua.indexOf('macintosh') !== -1 || nvua.indexOf('Macintosh') !== -1) {
            this.PlatformName = 'Macintosh';
            this.PlatformWindowManager = 'Macintosh';
            this.DeviceName = 'Macintosh Desktop';
            this.DeviceType = 'Desktop';
            if ((bnOffset = nvua.indexOf('intel mac')) !== -1 || (bnOffset = nvua.indexOf('Intel Mac')) !== -1 || (bnOffset = nvua.indexOf('INTEL MAC')) !== -1) {
                this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
            }
        } else if (nvua.indexOf('mobile') !== -1 || nvua.indexOf('Mobile') !== -1 || nvua.indexOf('MOBILE') !== -1) {
            this.DeviceType = 'Mobile';
            if (nvua.indexOf('linux') !== -1 || nvua.indexOf('Linux') !== -1 || nvua.indexOf('LINUX') !== -1) {
                this.PlatformWindowManager = 'Linux';
            }
            if ((bnOffset = nvua.indexOf('android')) !== -1 || (bnOffset = nvua.indexOf('Android')) !== -1 || (bnOffset = nvua.indexOf('ANDROID')) !== -1) {
                this.DeviceName = 'Android Mobile';
                this.PlatformName = this.retrievePlatformNameFull(nvua, bnOffset);
            }
        }

        return this.PlatformName, this.PlatformWindowManager, this.retrieveArchitecture(nvua);
    }

    retrievePlatformNameFull(nvua:any, bnOffset:any) {
        let offset = '';
        let data = nvua.substr(bnOffset).toString();

        if ((offset = data.indexOf(";")) !== -1) {
            data = data.toString().substring(0, offset);
        } else if ((offset = data.indexOf(")")) !== -1) {
            data = data.toString().substring(0, offset);
        } else if ((offset = data.indexOf(" ")) !== -1) {
            data = data.toString().substring(0, offset);
        }

        return data.replace(/[(/)]/g, ' ');
    }

    retrieveArchitecture(nvua:any) {
        if (nvua.indexOf('x64') !== -1 || nvua.indexOf('WOW64') !== -1 || nvua.indexOf('Win64') !== -1 || nvua.indexOf('amd64') !== -1 || nvua.indexOf('x86_64') !== -1) {
            this.BrowserArchitecture = '64 bit';
            this.PlatformArchitecture = '64 bit';
        } else if (nvua.indexOf('i586') !== -1 || nvua.indexOf('i686') !== -1 || nvua.indexOf('x86') !== -1 || nvua.indexOf('i386') !== -1) {
            this.BrowserArchitecture = '32 bit';
            this.PlatformArchitecture = '32 bit';
        }
    }

    retrieveBrowserInfo(nv:any) {
        let bnOffset = '';
        let nvua = nv.userAgent;
        this.UserAgent = nv.userAgent ? nv.userAgent : 'Unavailable';
        this.BrowserAppName = nv.appName ? nv.appName : 'Unavailable';
        this.BrowserAppCodeName = nv.appCodeName ? nv.appCodeName : 'Unavailable';
        this.BrowserAppVersion = nv.appVersion ? nv.appVersion : 'Unavailable';
        this.BrowserBuildID = nv.buildID ? nv.buildID : 'Unavailable';
        this.BrowserDoNotTrack = nv.doNotTrack ? nv.doNotTrack : 'Unavailable';
        this.BrowserCookieEnabled = nv.cookieEnabled ? nv.cookieEnabled : 'Unavailable';
        this.BrowserLanguage = nv.language ? nv.language : 'Unavailable';
        this.BrowserLanguageAll = nv.languages ? nv.languages : 'Unavailable';
        this.BrowserEngine = nv.product ? nv.product : 'Unavailable';
        this.BrowserEngineVersion = nv.productSub ? nv.productSub : 'Unavailable';
        this.DeviceHardwareConcurrency = nv.hardwareConcurrency ? nv.hardwareConcurrency : 'Unavailable';
        this.DeviceMemory = nv.DeviceMemory ? nv.DeviceMemory : 'Unavailable';
        this.BrowserVendor = nv.vendor ? nv.vendor : (this.BrowserName === 'Firefox' ? 'Mozilla Foundation' :  'Unavailable')


        if ((bnOffset = nvua.indexOf('firefox')) !== -1 || (bnOffset = nvua.indexOf('Firefox')) !== -1 || (bnOffset = nvua.indexOf('FIREFOX')) !== -1) {
            this.BrowserName = 'Firefox';
            this.BrowserNameFull = this.retrieveBrowserNameFull(nvua, bnOffset);
            this.BrowserVersion = this.retrieveBrowserVersion(this.BrowserName, this.BrowserNameFull);
            this.BrowserVersionFull = this.retrieveBrowserVersionFull(this.BrowserName, this.BrowserNameFull);
        } else if ((bnOffset = nvua.indexOf('opr')) !== -1 || (bnOffset = nvua.indexOf('Opr')) !== -1 || (bnOffset = nvua.indexOf('OPR')) !== -1) {
            this.BrowserName = 'Opera';
            this.BrowserNameFull = this.retrieveBrowserNameFull(nvua, bnOffset);
            this.BrowserVersion = this.retrieveBrowserVersion('OPR', this.BrowserNameFull);
            this.BrowserVersionFull = this.retrieveBrowserVersionFull('OPR', this.BrowserNameFull);
        } else if ((bnOffset = nvua.indexOf('opera')) !== -1 || (bnOffset = nvua.indexOf('Opera')) !== -1 || (bnOffset = nvua.indexOf('OPERA')) !== -1) {
            this.BrowserName = 'Opera';
            this.BrowserNameFull = this.retrieveBrowserNameFull(nvua, bnOffset);
            this.BrowserVersion = this.retrieveBrowserVersion(this.BrowserName, this.BrowserNameFull);
            this.BrowserVersionFull = this.retrieveBrowserVersionFull(this.BrowserName, this.BrowserNameFull);
        } else if ((bnOffset = nvua.indexOf('chromium')) !== -1 || (bnOffset = nvua.indexOf('Chromium')) !== -1 || (bnOffset = nvua.indexOf('CHROMIUM')) !== -1) {
            this.BrowserName = 'Chromium';
            this.BrowserNameFull = this.retrieveBrowserNameFull(nvua, bnOffset);
            this.BrowserVersion = this.retrieveBrowserVersion(this.BrowserName, this.BrowserNameFull);
            this.BrowserVersionFull = this.retrieveBrowserVersionFull(this.BrowserName, this.BrowserNameFull);
        } else if ((bnOffset = nvua.indexOf('chrome')) !== -1 || (bnOffset = nvua.indexOf('Chrome')) !== -1 || (bnOffset = nvua.indexOf('CHROME')) !== -1) {
            this.BrowserName = 'Chrome';
            this.BrowserNameFull = this.retrieveBrowserNameFull(nvua, bnOffset);
            this.BrowserVersion = this.retrieveBrowserVersion(this.BrowserName, this.BrowserNameFull);
            this.BrowserVersionFull = this.retrieveBrowserVersionFull(this.BrowserName, this.BrowserNameFull);
        } else if ((bnOffset = nvua.indexOf('edge')) !== -1 || (bnOffset = nvua.indexOf('Edge')) !== -1 || (bnOffset = nvua.indexOf('EDGE')) !== -1) {
            this.BrowserName = 'Edge';
            this.BrowserNameFull = this.retrieveBrowserNameFull(nvua, bnOffset);
            this.BrowserVersion = this.retrieveBrowserVersion(this.BrowserName, this.BrowserNameFull);
            this.BrowserVersionFull = this.retrieveBrowserVersionFull(this.BrowserName, this.BrowserNameFull);
        } else if ((bnOffset = nvua.indexOf('safari')) !== -1 || (bnOffset = nvua.indexOf('Safari')) !== -1 || (bnOffset = nvua.indexOf('SAFARI')) !== -1) {
            this.BrowserName = 'Safari';
            this.BrowserNameFull = this.retrieveBrowserNameFull(nvua, bnOffset);
            this.BrowserVersion = this.retrieveBrowserVersion(this.BrowserName, this.BrowserNameFull);
            this.BrowserVersionFull = this.retrieveBrowserVersionFull(this.BrowserName, this.BrowserNameFull);
        }
        return this;
    }

    browserStatus(navigator:any) {
        return this.BrowserStatus = navigator.onLine ? 'online' : 'offline';
    }

    retrieveBrowserNameFull(nvua:any, bnOffset:any) {
        let offset = '';
        let data = nvua.substr(bnOffset).toString();

        if ((offset = data.indexOf(";")) !== -1) {
            data = data.toString().substring(0, offset);
        }
        if ((offset = data.indexOf(")")) !== -1) {
            data = data.toString().substring(0, offset);
        }
        if ((offset = data.indexOf(" ")) !== -1) {
            data = data.toString().substring(0, offset);
        }

        return data.replace(/[(/)]/g, ' ');
    }

    retrieveBrowserVersion(BrowserName:string, BrowserNameFull:string) {
        return BrowserNameFull.substr(BrowserName.length + 1, (BrowserNameFull.search('\\.') - (BrowserName.length + 1)));
    }

    retrieveBrowserVersionFull(BrowserName:string, BrowserNameFull:string) {
        return BrowserNameFull.substr(BrowserName.length + 1);
    }

    mouseEvent() {
        window.onload = function () {
            /*capture all click event*/
            document.addEventListener('click', function (e) {
                //--alert('clicked');
                console.log(e);
            });
            /*capture all contextmenu event*/
            document.addEventListener('contextmenu', function (e) {
                //--alert('clicked');
                console.log(e);
            });
            /*capture all keyup event*/
            document.addEventListener('keyup', function (e) {
                //--alert('clicked');
                console.log(e);
            });
            /*capture all keydown event*/
            document.addEventListener('keydown', function (e) {
                //--alert('clicked');
                console.log(e);
            });
            /*capture all change event*/
            document.addEventListener('change',function (e) {
                console.log(e);
            });
        }
    }
}
