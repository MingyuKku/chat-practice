export {};

declare global {
    interface Window {
        HiingBridge?: HiingBridge;
        // flutter_inappwebview?: FlutterInappwebview;
    }
    
    interface DateConstructor {
        parseUtcText: (text: string) => Date;
        toUtcText:  (text: string) => Date;
    }
}

export interface HiingBridge {
    postMessage: (message: string) => void;
    setMemberInfo: (acc: string, se: number, nick_nm1: string, nick_nm2: string, appVer?: string) => void; 
    setRefreshToken: (acc: string) => void;
    updatePage: () => void;
    updateNickname: (nick_nm1: string, nick_nm2: string) => void;
    navigatePage: (url: string) => void;
}

export interface CallHandlerMessage {
    type: string;
    path?: string;
    param?: {
        [key: string]: string;
    }
}

export interface CallHandlerMessageMixpanel {
    tracking_type: string;
    event_name: string;
    param?: {
        [key: string]: string;
    }
}


Date.parseUtcText = function(text) {
    const date = Date.parseText(text);
  
    const timestamp = date.getTime() + (date.getTimezoneOffset() * -60 * 1000);
  
    return new Date(timestamp);
}

Date.toUtcText = function(text) {
    const date = Date.parseText(text);

    const timestamp = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);

    return new Date(timestamp);
}

Date.parseText = function(text) {
    try {
        if(typeof(text) === "string") {
            const seperator: string = text.includes("T")? "T" : " ";
            const halfs = text.split(seperator);
  
            if(halfs.length > 1) {
                const dates = halfs[0].split("-");
                const hours = halfs[1].split(":");
  
                if(hours.length >= 3) {
                    return new Date(parseInt(dates[0]), parseInt(dates[1])-1, parseInt(dates[2]),
                            parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2]));
                } else {
                    return new Date(parseInt(dates[0]), parseInt(dates[1])-1, parseInt(dates[2]),
                            parseInt(hours[0]), parseInt(hours[1]));
                }            
            } else if(halfs.length === 1) {
                const dates = halfs[0].split("-");
        
                return new Date(parseInt(dates[0]), parseInt(dates[1])-1, parseInt(dates[2]));
            } else {
                return new Date(text);
            }
        } else {
            // console.trace("parseText", text, typeof(text));
            return new Date(text);
        }
    } catch(err) {
        console.log(err, text);
    }
}