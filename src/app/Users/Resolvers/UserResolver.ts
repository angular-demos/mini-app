import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserEntity} from '../../Shared/Models/UserEntity';
import {AuthService} from '../../Shared/Services/Auth/AuthService';

/**
 * Fetches the current user and attaches to routes as data. Allowing child routes to know userId without having
 * to depend upon the AuthService.
 */
@Injectable()
export class UserResolver implements Resolve<any> {

    /**
     * Constructor
     */
    public constructor(private auth: AuthService) {

    }

    /**
     * A simple resolve to the current user.
     */
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserEntity> {
        return this.auth.getUsers().first();
    }
}
