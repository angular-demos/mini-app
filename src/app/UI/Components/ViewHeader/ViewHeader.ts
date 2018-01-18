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
     * The default sort direction
     */
    @Input()
    public sort: string;

    /**
     * Emits changes in the sort direction
     */
    @Output()
    public sortChange: EventEmitter<string> = new EventEmitter<string>();

    /**
     * An optional array of filters.
     */
    @Input()
    public filters: string[] = [];

    /**
     * The default filter
     */
    @Input()
    public filter: string;

    /**
     * Emits when the filter was changed.
     */
    @Output()
    public filterChange: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Emits a change to the filter.
     */
    public setFilter(value: string) {
        this.filterChange.emit(value);
    }

    /**
     * Emits a change to the search term.
     */
    public setSearch(term: string) {
        this.searchChange.emit(term);
    }

    /**
     * The tooltip text for the current sort direction.
     */
    public getSortTooltip() {
        if (this.sort === 'asc') {
            return 'Ascending';
        } else if (this.sort === 'desc') {
            return 'Descending';
        }
        return 'Unsorted';
    }

    /**
     * The icon for the current sort direction.
     */
    public getSortIcon() {
        if (this.sort === 'asc') {
            return 'fa-sort-amount-asc';
        } else if (this.sort === 'desc') {
            return 'fa-sort-amount-desc';
        }
        return 'fa-random';
    }

    /**
     * Emits the current sort direction.
     */
    public setSort(sort: string) {
        this.sortChange.emit(sort);
    }

    /**
     * Cycles through the different sort directions.
     */
    public getNextSort() {
        switch (this.sort) {
            case '':
                return 'asc';
            case 'asc':
                return 'desc';
        }
        return '';
    }
}
