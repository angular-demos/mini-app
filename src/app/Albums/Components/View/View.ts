import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlbumEntity} from '../../../Shared/Models/AlbumEntity';
import {SubscriptionMap} from '../../../Shared/Utils/SubscriptionMap';

@Component({
    selector: 'albums-view',
    templateUrl: './View.html',
    styleUrls: ['./View.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit, OnDestroy {
    /**
     * A collection of posts for this user.
     */
    public albums: AlbumEntity[] = [];

    /**
     * The current search term.
     */
    public search: string = '';

    /**
     * The current sort direction.
     */
    public sort: string = '';

    /**
     * Subscription helper.
     */
    private unsub: SubscriptionMap = new SubscriptionMap();

    /**
     * Constructor
     */
    public constructor(private route: ActivatedRoute) {

    }

    /**
     * Fetch data from the router.
     */
    public ngOnInit(): void {
        this.unsub.add(this.route.data.map((values: any) => values['Albums'])
            .subscribe((albums: AlbumEntity[]) => {
                this.albums = albums;
            }));
    }

    /**
     * Unsubscribe
     */
    public ngOnDestroy(): void {
        this.unsub.unsubscribe();
    }
}
