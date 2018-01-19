import {animate, state, style, transition, trigger} from '@angular/animations';
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToDoEntity} from '../../../Shared/Models/ToDoEntity';
import {SubscriptionMap} from '../../../Shared/Utils/SubscriptionMap';
import {CompletedEnum} from '../../Enums/CompletedEnum';

@Component({
    selector: 'todos-view',
    templateUrl: './View.html',
    styleUrls: ['./View.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('fadeOut', [
            state('removing', style({opacity: 1})),
            transition('* => removing', [
                animate('250ms ease-in-out', style({opacity: 0}))
            ])
        ])
    ]
})
export class ViewComponent implements OnInit, OnDestroy {
    /**
     * A collection of to do items for this user.
     */
    public todos: ToDoEntity[] = [];

    /**
     * A pre-filtered list of to do items.
     */
    public todosCache: ToDoEntity[] = [];

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
     * The default filter.
     */
    public filter: string = CompletedEnum.ALL;

    /**
     * A list of filter options.
     */
    public filters: string[] = [CompletedEnum.ALL, CompletedEnum.COMPLETED, CompletedEnum.UNFINISHED];

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
     * This just removes the items in memory. I didn't want to perform a DELETE on the REST end point.
     */
    public remove(todo: ToDoEntity) {
        const indx: number = this.todos.indexOf(todo);
        if (indx !== -1) {
            this.todos.splice(indx, 1);
        }
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
