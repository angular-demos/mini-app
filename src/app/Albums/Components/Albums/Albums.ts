import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'albums-albums',
    templateUrl: './Albums.html',
    styleUrls: ['./Albums.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsComponent {
}
