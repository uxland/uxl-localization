
declare var IntlMessageFormat;
import {get} from "dot-prop-immutable";

const getArgs = (args: any[]): any[] =>{
    let result = args;
    if(args && args.length == 1){
        if(Object.prototype.toString.call( args[0] ) === '[object Array]')
            result = args[0];
        else if (typeof args[0] === 'object'){
            let argObj = args[0];
            result = Object.keys(argObj).reduce((previous: any[], currentKey: string) =>{
                return previous.concat(currentKey, argObj[currentKey]);
            }, []);
        }
    }

    return result;
};
export type Localizer = (key: string, ...args: any[]) => string;
export type LocalizerFactory = (language: string, locales: Object, formats: any, useKeyIfMissing: boolean) => Localizer;
export const localizerFactory: LocalizerFactory = (language: string, locales: Object, formats: any, useKeyIfMissing: boolean) =>{
    let cachedMessages = {};
    return function localize(key: string, ...args: any[]) {
        if(!key || !locales || !language || !locales[language])
            return '';
        let translatedValue = get(locales[language], key);
        if(!translatedValue)
            return useKeyIfMissing ? key : '';
        if(!args || !args.length)
            return translatedValue;

        let messageKey = key + translatedValue;
        let translatedMessage = cachedMessages[messageKey];
        if (!translatedMessage) {
            translatedMessage = new IntlMessageFormat(translatedValue, language, formats);
            cachedMessages[messageKey] = translatedMessage;
        }
        args = getArgs(args);
        let arg = {};
        for (let i = 0; i < args.length; i += 2)
            arg[args[i]] = args[i+1];

        return translatedMessage.format(arg);
    }
};
export default localizerFactory;