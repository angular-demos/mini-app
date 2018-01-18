import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {PhotoEntity} from '../../../Shared/Models/PhotoEntity';

/**
 * Displays a single thumb-nail of a photo.
 */
@Component({
    selector: 'albums-photo',
    templateUrl: './Photo.html',
    styleUrls: ['./Photo.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoComponent {
    /**
     * The collection of photos to show.
     */
    @Input()
    public photo: PhotoEntity;

    /**
     * The size for the thumbnail
     */
    @Input()
    public size: number = 150;
}
