import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

interface SortOptions {
    /**
     * The property to use for sorting.
     */
    key: string;
    /**
     * The direction (asc or desc)
     */
    dir?: string;
}

@Pipe({
    name: 'sort',
    pure: false
})
export class SortPipe implements PipeTransform {
    /**
     * A simple array sorting function.
     */
    public transform(items: any[], options: SortOptions): any[] {
        if (!items || !options || !options.dir) {
            return items;
        }
        return _.orderBy(items, [options.key], [options.dir]);
    }
}
