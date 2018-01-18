import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../Shared/Services/Auth/AuthService';
import {ToastService} from '../../../Shared/Services/Toast/ToastService';

/**
 * Handles the logout action.
 */
@Component({
    selector: 'users-logout',
    templateUrl: './Logout.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutComponent {
    /**
     * Constructor
     */
    public constructor(auth: AuthService, router: Router, toast: ToastService) {
        auth.endSession()
            .take(1)
            .finally(() => {
                router.navigate(['/users/login']).catch(() => {
                    toast.danger('Could not redirect to login.');
                });
            })
            .subscribe(
                (value: boolean) => {
                    if(value) {
                        toast.success('You have been signed out.');
                    } else {
                        toast.warning('You need to sign in first.');
                    }
                },
                () => toast.warning('Could not end your current session.')
            );
    }
}
