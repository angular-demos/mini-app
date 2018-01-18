import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'users-login',
    templateUrl: './Login.html',
    styleUrls: ['./Login.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
}
