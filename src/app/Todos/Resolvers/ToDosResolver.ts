import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ToDoEntity} from '../../Shared/Models/ToDoEntity';
import {UserEntity} from '../../Shared/Models/UserEntity';
import {RestService} from '../../Shared/Services/Rest/RestService';

/**
 * Fetches the To Do list for the current user.
 */
@Injectable()
export class ToDosResolver implements Resolve<ToDoEntity[]> {

    /**
     * Constructor
     */
    public constructor(private rest: RestService) {

    }

    /**
     * Loads the Posts data.
     */
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ToDoEntity[]> {
        const user = <UserEntity>route.parent.parent.data.user;
        if (!user) {
            throw new Error('Main route must resolve the current user.');
        }
        return this.rest.getToDos(user.id)
            .map((resp: Response) => resp.json())
            .first();
    }
}
