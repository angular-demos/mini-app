import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';
import {AuthService} from '../../Shared/Services/Auth/AuthService';
import {ToastService} from '../../Shared/Services/Toast/ToastService';

/**
 * This guard prevents route changes that require a user session.
 */
@Injectable()
export class UserGuard implements CanActivate, CanActivateChild {
    /**
     * Constructor
     */
    constructor(
        private auth: AuthService,
        private router: Router,
        private toast: ToastService
    ) {
    }

    /**
     * Checks if a child route can be activated.
     */
    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
        | Promise<boolean>
        | boolean {
        return this.verify(state);
    }


    /**
     * Checks if a route can be activated.
     */
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
        | Observable<boolean>
        | Promise<boolean> {
        return this.verify(state);
    }

    /**
     * Will redirect to the log in route if no user is signed in.
     */
    private verify(state: RouterStateSnapshot): Observable<boolean> {
        return Observable.create((subscriber: Subscriber<boolean>) => {
            this.auth.getUsers()
                .first()
                .finally(() => subscriber.complete())
                .subscribe((value) => {
                    subscriber.next(!!value);
                    if (!value) {
                        if (state.url !== '/') {
                            this.toast.warning('You have to login to access that part of the website.',
                                'Sign In',
                                'fa-user');
                        }
                        this.router.navigate(['/users/login']).catch(() => {
                            this.toast.danger('Could not redirect to the log in view.');
                        });
                    }
                });
        });
    }
}
