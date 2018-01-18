import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlbumEntity} from '../../../Shared/Models/AlbumEntity';
import {SubscriptionMap} from '../../../Shared/Utils/SubscriptionMap';

@Component({
    selector: 'albums-view',
    templateUrl: './View.html',
    styleUrls: ['./View.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent {
    /**
     * A collection of posts for this user.
     */
    public albums: AlbumEntity[] = [];

    /**
     * The current search term.
     */
    public search: string = '';

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
