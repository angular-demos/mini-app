import {NgZone} from '@angular/core';

export class Zones {
    /**
     * Constructor
     */
    public constructor(public zone: NgZone) {

    }

    /**
     * Calls the callee in the next cycle.
     */
    public static later(zone: NgZone, callee: () => void) {
        window.setTimeout(() => {
            zone.run(() => {
                callee();
            });
        });
    }

    /**
     * Enters the zone if needed.
     */
    public static run(zone: NgZone, callee: () => any): any {
        return NgZone.isInAngularZone()
            ? callee()
            : zone.run(callee);
    }

    /**
     * Calls the callee in the next cycle.
     */
    public later(callee: () => void) {
        Zones.later(this.zone, callee);
    }

    /**
     * Enters the zone if needed.
     */
    public run(callee: () => any): any {
        return Zones.run(this.zone, callee);
    }
}
