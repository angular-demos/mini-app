import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

/**
 * A helper class that automates the unsubscribing of observables.
 */
export class SubscriptionMap {

    /**
     * A map of subscriptions by name.
     */
    private subs: Map<string, Subscription> = new Map();

    /**
     * Used to create unique names.
     */
    private count: number = 0;

    /**
     * Adds a subscription by name. If that name is already used the previous subscription is unsubscribed.
     */
    public set(name: string, sub: Subscription): this {
        if (name && sub) {
            this.unsubscribe(name);
            this.subs.set(name, sub);
        }
        return this;
    }

    /**
     * Subscribes to an observable and executes the next callback if a default value is passed.
     */
    public subscribe<T = any>(
        name: string,
        observe: Observable<T>,
        next: (value: T) => void,
        _default?: T
    ): this {
        this.set(name, observe.subscribe(next));
        if (next && typeof _default !== 'undefined') {
            next(_default);
        }
        return this;
    }

    /**
     * Adds a subscription with a uniquely generated name.
     */
    public add(sub: Subscription): string {
        const name = '@unique-' + (this.count++);
        this.set(name, sub);
        return name;
    }

    /**
     * Unsubscribes by a name or all.
     */
    public unsubscribe(name?: string): void {
        if (name) {
            if (this.subs.has(name)) {
                this.subs.get(name).unsubscribe();
                this.subs.delete(name);
            }
        } else {
            this.subs.forEach((sub) => sub.unsubscribe());
            this.subs.clear();
        }
    }
}
