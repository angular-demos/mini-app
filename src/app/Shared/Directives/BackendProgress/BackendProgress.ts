import {Directive, EventEmitter, NgZone, OnDestroy, Output} from '@angular/core';
import {XHRBackend} from '@angular/http';
import 'rxjs/add/operator/share';
import {Subscription} from 'rxjs/Subscription';
import {SharedBackend} from '../../Services/SharedBackend/SharedBackend';

/**
 * This directive adds bindings to templates so that you can run expressions when HTTP operations happen.
 */
@Directive({
    selector: '[backend-progress]'
})
export class BackendProgressDirective implements OnDestroy {
    /**
     * Emits when a HTTP request is started.
     */
    @Output()
    public start: EventEmitter<undefined> = new EventEmitter();

    /**
     * Emits when a HTTP request is finished.
     */
    @Output()
    public stop: EventEmitter<undefined> = new EventEmitter();

    /**
     * The HTTP subscription.
     */
    private subscriber: Subscription;

    /**
     * Keeps track of how many nested HTTP operations are running.
     */
    private active: number = 0;

    /**
     * Constructor
     */
    public constructor(backend: XHRBackend, private zone: NgZone) {
        if (backend instanceof SharedBackend) {
            (<SharedBackend> backend).connections.subscribe((con) => {
                this.onStart();
                this.subscriber = con.response.share().subscribe(() => {
                    this.onStop('success');
                }, () => {
                    this.onStop('error');
                }, () => {
                    this.onStop('complete');
                });
            });

        } else {
            console.error('XHRBackend is not an instance of SharedBackend');
        }
    }

    /**
     * Release subscription to the backend.
     */
    public ngOnDestroy(): void {
        if (this.subscriber) {
            this.subscriber.unsubscribe();
        }
        this.subscriber = null;
    }

    /**
     * Called when a HTTP request is made.
     */
    protected onStart(): void {
        this.active++;
        if (this.active === 1) {
            this.zone.run(() => {
                this.start.next();
            });
        }
    }

    /**
     * Called when a HTTP request is finished.
     */
    protected onStop(why: string): void {
        this.active--;
        if (this.active === 0) {
            this.zone.run(() => {
                this.stop.next();
            });
        }
    }
}
