import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
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
export class PhotosComponent {
    /**
     * The collection of photos to show.
     */
    @Input()
    public photos: PhotoEntity[] = [];

    /**
     * Pagination number for showing photos.
     */
    public photosPage: number = 0;
}
