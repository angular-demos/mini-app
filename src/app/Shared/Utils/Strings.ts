import * as _ from 'lodash';

export class Strings {
    /**
     * Escapes a string so it can be used in a RegExp
     */
    public static escapeRegExp(value: string): string {
        return value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    }

    /**
     * Converts a string of time to milliseconds.
     */
    public static toMilliseconds(value: string | number): number {
        if (typeof value === 'string') {
            // seconds
            if (/^\d+s$/i.test(value)) {
                return ~~(value.substr(0, value.length - 1)) * 1000;
            }
            // minutes
            if (/^\d+m$/i.test(value)) {
                return ~~(value.substr(0, value.length - 1)) * 60000;
            }
        }
        return ~~value;
    }

    /**
     * Converts a string with delimiters to an array.
     */
    public static toArray(str: string | string[], delimiter?: string): string[] {
        str = str || [];
        str = _.isString(str) ? _.split(str, delimiter || ',') : str;
        const arr = str instanceof Array ? str : [str];
        return _.filter(_.map(arr, (s: any) => _.isString(s) ? s.trim() : null));
    }

    /**
     * Lower case all strings.
     */
    public static toLowerCase(str: string[]): string[] {
        return _.map(str, (s) => s.toLowerCase());
    }
}
