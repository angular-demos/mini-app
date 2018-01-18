import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'todos-view',
    templateUrl: './View.html',
    styleUrls: ['./View.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent {
}
