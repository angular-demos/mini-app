import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {PostEntity} from '../../Shared/Models/PostEntity';
import {UserEntity} from '../../Shared/Models/UserEntity';
import {RestService} from '../../Shared/Services/Rest/RestService';

/**
 * Fetches the Posts for the current user.
 */
@Injectable()
export class PostsResolver implements Resolve<any> {

    /**
     * Constructor
     */
    public constructor(private rest: RestService) {

    }

    /**
     * Loads the Posts data.
     */
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PostEntity[]> {
        const user = <UserEntity>route.parent.parent.data.user;
        if (!user) {
            throw new Error('Main route must resolve the current user.');
        }
        return this.rest.getPosts(user.id)
            .map((resp: Response) => resp.json())
            .first();
    }
}
