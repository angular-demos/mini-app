import {animate, AnimationTransitionMetadata, keyframes, style, transition} from '@angular/animations';
import {Timings} from './Timings';

/**
 * @deprecated This breaks AOT
 */
export class Animations {

    /**
     * Performs a fade in.
     */
    public static fadeIn(
        trans?: string,
        speed?: string | number,
        delay?: string | number
    ): AnimationTransitionMetadata {
        return transition(trans || ':enter', [
            animate(Timings.easeIn(speed, delay), keyframes([
                style({opacity: 0}),
                style({opacity: 1})
            ]))
        ]);
    }

    /**
     * Performs a fade out.
     */
    public static fadeOut(
        trans?: string,
        speed?: string | number,
        delay?: string | number
    ): AnimationTransitionMetadata {
        return transition(trans || ':leave', [
            animate(Timings.easeOut(speed, delay), keyframes([
                style({opacity: 1}),
                style({opacity: 0})
            ]))
        ]);
    }

    /**
     * Performs a fade in and out.
     */
    public static fadeInOut(
        transIn?: string,
        speedIn?: string | number,
        delayIn?: string | number,
        transOut?: string,
        speedOut?: string | number,
        delayOut?: string | number
    ): AnimationTransitionMetadata[] {
        return [
            Animations.fadeIn(transIn, speedIn, delayIn),
            Animations.fadeOut(transOut, speedOut, delayOut)
        ];
    }
}
