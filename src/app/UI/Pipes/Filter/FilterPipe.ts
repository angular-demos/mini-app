import {Pipe, PipeTransform} from '@angular/core';
import {Strings} from '../../../Shared/Utils/Strings';

/**
 * These are the properties that will be filtered.
 */
interface FilterItem {
    title?: string;
    body?: string;
}

/**
 * An array filter that matches title and body properties.
 */
@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    /**
     * A simple array filter function.
     */
    public transform(items: FilterItem[], search: string): any[] {
        return !items || !search
            ? items
            : items.filter((item: FilterItem) => {
                let reg = new RegExp('\\b(' + Strings.escapeRegExp(search) + ')\\b', 'gi');
                return reg.test(item.title || '') || reg.test(item.body || '');
            });
    }
}
