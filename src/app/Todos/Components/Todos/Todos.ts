import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'todos-todos',
    templateUrl: './Todos.html',
    styleUrls: ['./Todos.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent {
}
