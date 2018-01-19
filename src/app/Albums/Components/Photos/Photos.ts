import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PhotoEntity} from '../../../Shared/Models/PhotoEntity';

/**
 * Displays a paginated collection of photos.
 */
@Component({
    selector: 'albums-photos',
    templateUrl: './Photos.html',
    styleUrls: ['./Photos.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotosComponent implements OnInit, OnChanges {
    /**
     * The collection of photos to show.
     */
    @Input()
    public photos: PhotoEntity[] = [];

    /**
     * How many photos per row.
     */
    @Input()
    public columns: number = 4;

    /**
     * How many rows per page.
     */
    @Input()
    public rows: number = 4;

    /**
     * Photos are divided into pages then rows and then columns.
     */
    public pages: PhotoEntity[][][] = [];

    /**
     * Pagination number for showing photos. (Pagination starts at 1)
     */
    public page: number = 1;

    /**
     * Updates the layout of the photo rows.
     */
    public ngOnInit(): void {
        this.update();
    }

    /**
     * Updates if any of the input bindings change.
     */
    public ngOnChanges(changes: SimpleChanges): void {
        this.update();
    }

    /**
     * Splits the photos into rows and then splits rows into pages.
     */
    private update() {
        const columnCount = Math.max(1, this.columns);
        const rowCount = Math.max(1, this.rows);
        let rows = [];
        for (let i = 0; i < this.photos.length; i += columnCount) {
            let row = this.photos.slice(i, i + columnCount);
            if (row.length < columnCount) {
                // fill missing photos with nulls
                row.push(...Array(columnCount - row.length).fill(null));
            }
            rows.push(row);
        }
        this.pages = [];
        for (let i = 0; i < rows.length; i += rowCount) {
            this.pages.push(rows.slice(i, i + rowCount));
        }
    }
}
