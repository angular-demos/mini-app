import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Renders the top header on feature views. Includes support for searching and sort order.
 */
@Component({
    selector: 'ui-view-header',
    styleUrls: ['./ViewHeader.scss'],
    templateUrl: './ViewHeader.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewHeaderComponent {
    /**
     * The view title
     */
    @Input()
    public title: string;

    /**
     * A number that represents search matches.
     */
    @Input()
    public count: number;

    /**
     * The default value for the search term.
     */
    @Input()
    public search: string;

    /**
     * Emits changes to the search term.
     */
    @Output()
    public searchChange: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Emits a change to the search term.
     */
    public setSearch(term: string) {
        this.searchChange.emit(term);
    }
}
