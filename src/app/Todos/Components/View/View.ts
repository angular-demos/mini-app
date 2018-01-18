import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToDoEntity} from '../../../Shared/Models/ToDoEntity';
import {SubscriptionMap} from '../../../Shared/Utils/SubscriptionMap';

@Component({
    selector: 'todos-view',
    templateUrl: './View.html',
    styleUrls: ['./View.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit, OnDestroy {
    /**
     * A collection of to do items for this user.
     */
    public todos: ToDoEntity[] = [];

    /**
     * The current search term.
     */
    public search: string = '';

    /**
     * The current sort direction.
     */
    public sort: string = '';

    /**
     * The pagination number.
     */
    public page: number = 1;

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
        this.unsub.add(this.route.data.map((values: any) => values['ToDos'])
            .subscribe((todos: ToDoEntity[]) => {
                this.todos = todos;
            }));
    }

    /**
     * Unsubscribe
     */
    public ngOnDestroy(): void {
        this.unsub.unsubscribe();
    }
}
