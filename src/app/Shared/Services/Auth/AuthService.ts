import {Injectable} from '@angular/core';
import {RequestMethod, Response} from '@angular/http';
import * as _ from 'lodash';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subject} from 'rxjs/Subject';
import {Subscriber} from 'rxjs/Subscriber';
import {UserEntity} from '../../Models/UserEntity';
import {RestService} from '../Rest/RestService';
import {StorageService} from '../Storage/StorageService';
import {STORAGE_TOKEN} from '../Storage/StorageToken';
import {ToastService} from '../Toast/ToastService';

@Injectable()
export class AuthService {
    /**
     * Emits session objects or null.
     */
    private _sessions: Subject<UserEntity | null>;

    /**
     * Constructor
     */
    public constructor(
        private storage: StorageService,
        private rest: RestService,
        toast: ToastService
    ) {
        this._sessions = new ReplaySubject(1);

        let token = this.storage.getString(STORAGE_TOKEN);
        if (token) {
            this.restore(token)
                .subscribe(() => {
                    toast.success('You have been logged in automatically.');
                }, () => {
                    this.setSession(null);
                    toast.warning('Could not restore user session.');
                });
        } else {
            this.setSession(null);
        }
    }

    /**
     * Removes the auth token from storage. This doesn't end the current session and authenticate will still be
     * included in future HTTP headers. What this does is prevent a session from being restored if the page is
     * reloaded.
     */
    public forgetToken(): void {
        this.storage.remove(STORAGE_TOKEN);
    }

    /**
     * Broadcasts a new session to subscribed listeners.
     */
    public setSession(value: UserEntity | null, remember?: boolean): this {
        this._sessions.next(value);

        if (value && remember) {
            this.storage.set(STORAGE_TOKEN, value.id);
        } else {
            this.storage.remove(STORAGE_TOKEN);
        }

        return this;
    }

    /**
     * Gets an observable that can be watched for new user sessions.
     *
     * @todo Rename to getUsers
     */
    public getSessions(): Observable<UserEntity | null> {
        return this._sessions;
    }

    /**
     * Ends a session and tells the server to remove the session.
     */
    public endSession(): Observable<boolean> {
        this.storage.remove(STORAGE_TOKEN);

        return Observable.create((subscriber: Subscriber<boolean>) => {
            this.getSessions()
                .first()
                .subscribe((session: UserEntity | null) => {
                    if (session === null) {
                        subscriber.next(true);
                        subscriber.complete();
                    } else {
                        this.setSession(null);
                        subscriber.complete();
                    }
                });
        }).share();
    }

    /**
     * Returns an observable that completes when the restore finishes.
     */
    public restore(token: string): Observable<UserEntity> {
        // return this.userSessions
        //     .newEntity({token})
        //     .createSession()
        //     .do((response: RestResponse<UserSessionEntity>) => {
        //         this.setSession(response.isSuccessStatus() ? response.getOne() : null, true);
        //     });
        return null;
    }

    /**
     * Returns an observable that completes when the login has finished.
     */
    public logIn(email: string, password: string, remember: boolean): Observable<UserEntity> {

        console.log(email);

        return this.rest
            .execute(RequestMethod.Get, 'https://jsonplaceholder.typicode.com/users')
            .map((resp: Response) => {
                let entity = _.find(resp.json(), {email: email});
                if (!entity) {
                    // this fakes a resource invalid error.
                    resp.status = 401;
                    throw resp;
                }
                return entity;
            });


        // return this.userSessions
        //     .newEntity({email, password})
        //     .createSession()
        //     .filter((response: RestResponse<UserSessionEntity>) => response.isSuccessStatus())
        //     .map((response: RestResponse<UserSessionEntity>) => {
        //         const userSession = response.getOne();
        //         userSession.remember = remember;
        //         this.setSession(userSession, remember);
        //         return userSession;
        //     });
    }
}
