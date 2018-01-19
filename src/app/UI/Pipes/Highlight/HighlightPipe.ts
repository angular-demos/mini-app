import {Pipe, PipeTransform} from '@angular/core';
import {Strings} from '../../../Shared/Utils/Strings';

/**
 * Applies a span wrapping around matched text.
 */
@Pipe({
    name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
    public transform(value: string, match: string, words?: boolean) {
        if (match) {
            let reg = words
                ? new RegExp('\\b(' + Strings.escapeRegExp(match) + ')\\b', 'gi')
                : new RegExp('(' + Strings.escapeRegExp(match) + ')', 'gi');
            return value.replace(reg, '<span class="highlight">$1</span>');
        }
        return value;
    }
}
