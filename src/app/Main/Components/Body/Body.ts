import {ChangeDetectorRef, Component, Inject, NgZone, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Changes} from '../../../Shared/Utils/Changes';

@Component({
    selector: 'body',
    styleUrls: ['./Body.scss'],
    templateUrl: './Body.html'
})
export class BodyComponent {

    /**
     * Shows the loading bar.
     */
    public loading: boolean = false;

    /**
     * When outlet is not active it means the application is still bootstrapping.
     */
    @ViewChild(RouterOutlet)
    public outlet: RouterOutlet;

    private changes: Changes;

    /**
     * Constructor
     */
    public constructor(
        //rest: RestService,
        cdr: ChangeDetectorRef,
        zone: NgZone
    ) {
        this.changes = new Changes(cdr, zone);
        // rest.busy.subscribe((value) => {
        //     this.changes.laterMark(() => {
        //         this.loading = value;
        //     });
        // });
    }
}
