import * as _ from 'lodash';

/**
 * @deprecated This breaks AOT
 */
export class Timings {
    /**
     * The default speed for animations.
     */
    public static DEFAULT_SPEED = '0.3s';

    /**
     * The timing for an ease-in
     */
    public static easeIn(speed?: string | number, delay?: string | number): string {
        return Timings.toTime(speed, delay, 'ease-in');
    }

    /**
     * The timing for an ease-in-out
     */
    public static easeInOut(speed?: string | number, delay?: string | number): string {
        return Timings.toTime(speed, delay, 'ease-in-out');
    }

    /**
     * The timing for an ease-out
     */
    public static easeOut(speed?: string | number, delay?: string | number): string {
        return Timings.toTime(speed, delay, 'ease-out');
    }

    /**
     * Converts a value to seconds. Numbers are converted from milliseconds to seconds.
     */
    public static toSeconds(value?: any): string {
        if (typeof value === 'undefined') {
            value = '0s';
        }
        if (_.isNumber(value)) {
            value = (value / 1000) + 's';
        }
        return value;
    }

    /**
     * Generates a timing string for Angular animation.
     */
    public static toTime(speed: string | number, delay: string | number, func: string): string {
        speed = Timings.toSeconds(speed || Timings.DEFAULT_SPEED);
        delay = delay ? Timings.toSeconds(delay) : void 0;
        return speed + (delay ? (' ' + delay) : '') + ' ' + func;
    }
}
