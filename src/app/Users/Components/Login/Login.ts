import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn} from '@angular/forms';
import {UserEntity} from '../../../Shared/Models/UserEntity';
import {AuthService} from '../../../Shared/Services/Auth/AuthService';
import {ToastService} from '../../../Shared/Services/Toast/ToastService';

/**
 * Handles the login prompt and authentication action.
 */
@Component({
    selector: 'users-login',
    templateUrl: './Login.html',
    styleUrls: ['./Login.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    /**
     * Holds data entered on the form.
     */
    public model: UserEntity;

    /**
     * Disables the form when a HTTP operation takes place.
     */
    public busy: boolean = false;

    /**
     * Constructor
     */
    public constructor(
        private fb: FormBuilder,
        private toast: ToastService,
        private auth: AuthService,
        private change: ChangeDetectorRef
    ) {
        this.model = {} as UserEntity;
    }

    /**
     * Handles the login action using the Auth service.
     */
    public login(event?: Event): void {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        this.busy = true;
        this.auth
            .logIn(this.model.email, this.model.password, this.model.remember)
            .finally(() => {
                this.busy = false;
                this.change.detectChanges();
            })
            .subscribe(() => {
                    // @todo route to home
                },
                (rest: Response) => {
                    if (rest.status === 401) {
                        this.toast.warning('Your email or password was incorrect.', 'Try Again');
                    } else {
                        this.toast.danger('A server error prevented your login.');
                    }
                });
    }

    /**
     * Email validator for the form.
     */
    private validateEmail(): ValidatorFn {
        const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

        return (c: AbstractControl): ValidationErrors | null => {
            const str = c.value as string;
            return regex.test(str) ? null : {
                email: 'Enter a valid email address.'
            };
        };
    }
}
