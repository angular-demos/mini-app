import {ChangeDetectorRef, Component, HostBinding, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {RestService} from '../../../Shared/Services/Rest/RestService';
import {Changes} from '../../../Shared/Utils/Changes';
import {SubscriptionMap} from '../../../Shared/Utils/SubscriptionMap';

@Component({
    selector: 'body',
    styleUrls: ['./Body.scss'],
    templateUrl: './Body.html'
})
export class BodyComponent implements OnDestroy {

    /**
     * Shows the loading bar.
     */
    public loading: boolean = false;

    /**
     * When outlet is not active it means the application is still bootstrapping.
     */
    @ViewChild(RouterOutlet)
    public outlet: RouterOutlet;

    @HostBinding('class.login')
    public isLogin: boolean = true;

    /**
     * Helps with observables.
     */
    private unsub: SubscriptionMap = new SubscriptionMap();

    /**
     * Helps with change detection.
     */
    private changes: Changes;

    /**
     * Constructor
     */
    public constructor(
        router: Router,
        rest: RestService,
        cdr: ChangeDetectorRef,
        zone: NgZone
    ) {
        this.changes = new Changes(cdr, zone);
        this.unsub.set('rest', rest.busy.subscribe((value) => {
            this.changes.laterMark(() => {
                this.loading = value;
            });
        }));

        this.unsub.set('router', router.events.subscribe((value) => {
            if (value instanceof NavigationEnd) {
                this.isLogin = value.url === '/users/login';
            }
        }));
    }

    /**
     * Free subscriptions.
     */
    public ngOnDestroy(): void {
        this.unsub.unsubscribe();
    }
}
