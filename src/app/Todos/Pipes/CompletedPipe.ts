import {Pipe, PipeTransform} from '@angular/core';
import {ToDoEntity} from '../../Shared/Models/ToDoEntity';
import {CompletedEnum} from '../Enums/CompletedEnum';

/**
 * Filters a to do list by the completed flag.
 */
@Pipe({
    name: 'completed',
    pure: false
})
export class CompletedPipe implements PipeTransform {
    /**
     * A simple to do list filter function.
     */
    public transform(items: ToDoEntity[], filter: string): any[] {
        return !items || !filter || filter === CompletedEnum.ALL
            ? items
            : items.filter((item: ToDoEntity) => {
                return item.completed === (filter === CompletedEnum.COMPLETED);
            });
    }
}
