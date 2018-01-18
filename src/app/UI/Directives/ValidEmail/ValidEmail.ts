import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

/**
 * Defines a form validation rule for email addresses.
 */
@Directive({
    selector: '[valid-email]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ValidEmailDirective,
        multi: true
    }]
})
export class ValidEmailDirective implements Validator {
    /**
     * Email validator.
     */
    public validate(control: AbstractControl): ValidationErrors | null {
        return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(control.value as string) ? null : {
            email: 'Enter a valid email address.'
        };
    }
}
