import {Pipe, PipeTransform} from '@angular/core';
import {Strings} from '../../../Shared/Utils/Strings';

@Pipe({
    name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
    public transform(value: string, match: string) {
        if (match) {
            return value.replace(
                new RegExp('(' + Strings.escapeRegExp(match) + ')', 'gi'),
                '<span class="highlight">$1</span>'
            );
        }
        return value;
    }
}
