import {ChangeDetectorRef, NgZone, SimpleChange, SimpleChanges} from '@angular/core';
import {Zones} from './Zones';

export type ChangeHandler<TType> = (newValue: TType, oldValue: TType, first: boolean) => void;

export class Changes extends Zones {
    /**
     * Constructor
     */
    public constructor(public cdr: ChangeDetectorRef, public zone: NgZone) {
        super(zone);
    }

    /**
     * Calls the watcher function and if it returns a non-undefined value the handler is executed.
     */
    public static watch<TType>(
        current: TType,
        reader: (current: TType) => TType,
        handler: ChangeHandler<TType>
    ): TType {
        const value = reader(current);
        if (value !== current) {
            handler(value, current, typeof current === 'undefined');
        }
        return value;
    }

    /**
     * Calls the handler if the changes contains the name.
     */
    public static on<TType>(
        changes: SimpleChanges,
        name: string,
        handler: ChangeHandler<TType>
    ): void {
        if (name in changes) {
            handler(changes[name].currentValue, changes[name].previousValue, changes[name].firstChange);
        }
    }

    public static any(changes: SimpleChanges, names: string[], handler: (changes: SimpleChanges) => void): void {
        for (let name of names) {
            if (name in changes) {
                handler(changes);
                return;
            }
        }
    }

    /**
     * Calls the handler if changes contains any one of the names.
     */
    public static once<TType>(
        changes: SimpleChanges,
        name: string,
        handler: ChangeHandler<TType>
    ): void {
        if (changes[name] && changes[name].firstChange) {
            Changes.on<TType>(changes, name, handler);
        }
    }

    /**
     * Calls the callee and if it returns a truthy value the change detector is marked for check. Returns the value
     * from the callee as a pass through condition.
     */
    public static markIf(cdr: ChangeDetectorRef, callee: () => any): any {
        const value = callee();
        if (!!value) {
            cdr.markForCheck();
        }
        return value;
    }

    /**
     * Always marks the change detector after calling the callee.
     */
    public static mark(cdr: ChangeDetectorRef, callee?: () => any): any {
        try {
            if (callee) {
                return callee();
            }
        } finally {
            cdr.markForCheck();
        }
        return void 0;
    }

    /**
     * Calls the callee in the next cycle and if it returns true will mark the change detector for check.
     */
    public static laterIf(zone: NgZone, cdr: ChangeDetectorRef, callee: () => boolean): void {
        window.setTimeout(() => {
            zone.run(() => {
                Changes.markIf(cdr, callee);
            });
        });
    }

    /**
     * Calls the callee in the next cycle and always marks the change detector for check.
     */
    public static laterMark(zone: NgZone, cdr: ChangeDetectorRef, callee: () => void): void {
        window.setTimeout(() => {
            zone.run(() => {
                Changes.mark(cdr, callee);
            });
        });
    }

    /**
     * Calls the callee after the timeout and marks the change detector for check.
     */
    public static delayedMark(zone: NgZone, cdr: ChangeDetectorRef, callee: () => void, timeout: number): number {
        return window.setTimeout(() => {
            zone.run(() => {
                Changes.mark(cdr, callee);
            });
        }, timeout);
    }

    /**
     * Calls the callee after the timeout and if it returns true the change detector is marked for check.
     */
    public static delayedIf(zone: NgZone, cdr: ChangeDetectorRef, callee: () => boolean, timeout: number): number {
        return window.setTimeout(() => {
            zone.run(() => {
                Changes.markIf(cdr, callee);
            });
        }, timeout);
    }

    /**
     * Creates a SimpleChanges object by comparing the value to the returned value of the callee.
     */
    public static create<TType>(
        propName: string,
        oldValue: TType,
        callee: (oldValue: TType) => TType,
        changes: SimpleChanges
    ): TType {
        const newValue = callee(oldValue);
        if (newValue !== oldValue) {
            Changes.simple(propName, oldValue, newValue, changes);
        }
        return newValue;
    }

    /**
     * Updates a SimpleChanges object.
     */
    public static simple(propName: string, oldValue: any, newValue: any, changes?: SimpleChanges): SimpleChanges {
        changes = changes || {};
        changes[propName] = new SimpleChange(oldValue, newValue, false);
        return changes;
    }

    /**
     * Calls the callee and if it returns a truthy value the change detector is marked for check. Returns the value
     * from the callee as a pass through condition.
     */
    public markIf(callee: () => any): any {
        return Changes.markIf(this.cdr, callee);
    }

    /**
     * Always marks the change detector after calling the callee.
     */
    public mark(callee?: () => any): any {
        return Changes.mark(this.cdr, callee);
    }

    /**
     * Calls the callee in the next cycle and if it returns true will mark the change detector for check.
     */
    public laterIf(callee: () => boolean): void {
        Changes.laterIf(this.zone, this.cdr, callee);
    }

    /**
     * Calls the callee in the next cycle and always marks the change detector for check.
     */
    public laterMark(callee: () => void): void {
        Changes.laterMark(this.zone, this.cdr, callee);
    }

    /**
     * Calls the callee after the timeout and marks the change detector for check.
     */
    public delayedMark(callee: () => void, timeout: number): number {
        return Changes.delayedMark(this.zone, this.cdr, callee, timeout);
    }

    /**
     * Calls the callee after the timeout and if it returns true the change detector is marked for check.
     */
    public delayedIf(callee: () => boolean, timeout: number): number {
        return Changes.delayedIf(this.zone, this.cdr, callee, timeout);
    }
}
