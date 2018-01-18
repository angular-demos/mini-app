import {Pipe, PipeTransform} from '@angular/core';
import {Strings} from '../../../Shared/Utils/Strings';

/**
 * Applies a span wrapping around matched text.
 */
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
