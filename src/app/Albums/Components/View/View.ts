import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'albums-view',
    templateUrl: './View.html',
    styleUrls: ['./View.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent {
}
