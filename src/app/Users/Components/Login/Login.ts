import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
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
     * Defines the form inputs for the template.
     */
    public form: FormGroup;

    /**
     * Disables the form when a HTTP operation takes place.
     */
    public busy: boolean = false;

    /**
     * Constructor
     */
    public constructor(
        private fb: FormBuilder,
        private toast: ToastService
    ) {
        this.form = fb.group({
            email: this.fb.control('', [Validators.required, this.validateEmail()]),
            password: fb.control('', [Validators.required]),
            remember: fb.control(false)
        });
    }

    /**
     * Handles the login action using the Auth service.
     */
    public login(event?: Event): void {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        if (this.form.invalid) {
            return;
        }

        let formData = this.form.getRawValue();
        const email = formData['email'];
        this.busy = true;
        // this.auth
        //     .logIn(email, formData['password'], formData['remember'])
        //     .finally(() => this.form.setValue({
        //         email: formData['email'],
        //         password: '',
        //         remember: formData['remember']
        //     }))
        //     .finally(() => this.busy = false)
        //     .subscribe(() => this.routes.home(),
        //         (rest: Response) => {
        //             if (rest.status === 401) {
        //                 this.toast.warning('Your email or password was incorrect.', 'Try Again');
        //             } else {
        //                 this.toast.danger('A server error prevented your login.');
        //             }
        //         });
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
