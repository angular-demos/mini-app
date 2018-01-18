import {animate, state, style, transition, trigger} from '@angular/animations';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ToDoEntity} from '../../../Shared/Models/ToDoEntity';

/**
 * Handles the displaying of a single to do item.
 */
@Component({
    selector: '[todos-row]',
    templateUrl: './Row.html',
    styleUrls: ['./Row.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowComponent {
    /**
     * The to do record to show.
     */
    @Input()
    public todo: ToDoEntity;

    /**
     * A search term that is highlighted on the title
     */
    @Input()
    public search: string;

    /**
     * Emits when the to do is removed by the user.
     */
    @Output()
    public remove: EventEmitter<ToDoEntity> = new EventEmitter();
}
