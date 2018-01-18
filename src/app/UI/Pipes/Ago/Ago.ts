import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

@Pipe({
    name: 'ago'
})
export class AgoPipe implements PipeTransform {
    /**
     * Transforms a datetime into time ago in words.
     */
    public transform(value: Date, simple: boolean | any) {
        if (_.isDate(value)) {
            return moment(value).fromNow(!!simple);
        }
        return value;
    }
}
