import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {SubscriptionMap} from '../../../Shared/Utils/SubscriptionMap';

@Component({
    selector: 'app-main',
    templateUrl: './Main.html',
    styleUrls: ['./Main.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnDestroy {
    /**
     * Handles the collapsing of the navbar on mobile.
     */
    public toggleCollapse: boolean = false;

    /**
     * Helper for subscriptions.
     */
    private unsub: SubscriptionMap = new SubscriptionMap();

    /**
     * Constructor
     */
    public constructor(router: Router) {
        this.unsub.set('router', router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.toggleCollapse = false;
            }
        }));
    }

    /**
     * Unsubscribe
     */
    public ngOnDestroy(): void {
        this.unsub.unsubscribe();
    }
}
