import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    /**
     * A simple array filter function.
     */
    public transform(items: any[], filter: Object): any[] {
        if (!items || !filter) {
            return items;
        }
        return items.filter((item) => {
            let match = false;
            Object.keys(filter).forEach((key) => {
                if (item.hasOwnProperty(key)) {
                    match = match || item[key].indexOf(filter[key]) !== -1;
                }
            });
            return match;
        });
    }
}