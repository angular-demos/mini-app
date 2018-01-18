import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserEntity} from '../../../Shared/Models/UserEntity';
import {AuthService} from '../../../Shared/Services/Auth/AuthService';

@Component({
    selector: 'users-info',
    templateUrl: './Info.html',
    styleUrls: ['./Info.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent {
    /**
     * Emits user session changes.
     */
    public user: Observable<UserEntity | null>;

    /**
     * Constructor
     */
    public constructor(auth: AuthService) {
        this.user = auth.getUsers();
    }
}
