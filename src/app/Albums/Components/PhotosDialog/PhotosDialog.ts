import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PhotoEntity} from '../../../Shared/Models/PhotoEntity';

/**
 * Displays a collection of photos as a modal popup.
 */
@Component({
    selector: 'albums-photos-dialog',
    templateUrl: './PhotosDialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'photos'
})
export class PhotosDialogComponent {
    /**
     * The modal template
     */
    @ViewChild('content')
    public content: ElementRef;

    /**
     * Title for the dialog
     */
    @Input()
    public title: string;

    /**
     * The collection of photos to show.
     */
    @Input()
    public photos: PhotoEntity[] = [];

    /**
     * Constructor
     */
    public constructor(private modalService: NgbModal) {

    }

    /**
     * API to trigger the showing of the modal.
     */
    public show() {
        this.modalService.open(this.content, {size: 'lg'});
    }
}
