import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
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
     * Emits user objects or null.
     */
    private _users: Subject<UserEntity | null>;

    /**
     * Constructor
     */
    public constructor(
        private storage: StorageService,
        private rest: RestService,
        toast: ToastService
    ) {
        this._users = new ReplaySubject(1);

        let token = this.storage.getString(STORAGE_TOKEN);
        if (token) {
            this.restore(token)
                .subscribe(() => {
                    toast.success('You have been logged in automatically.');
                }, () => {
                    this.setUser(null);
                    toast.warning('Could not restore user session.');
                });
        } else {
            this.setUser(null);
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
    public setUser(value: UserEntity | null, remember?: boolean): this {
        this._users.next(value);

        if (value && remember) {
            this.storage.set(STORAGE_TOKEN, value.id);
        } else {
            this.storage.remove(STORAGE_TOKEN);
        }

        return this;
    }

    /**
     * Gets an observable that can be watched for new user sessions.
     */
    public getUsers(): Observable<UserEntity | null> {
        return this._users;
    }

    /**
     * Ends a session and tells the server to remove the session.
     */
    public endSession(): Observable<boolean> {
        this.storage.remove(STORAGE_TOKEN);

        return Observable.create((subscriber: Subscriber<boolean>) => {
            this.getUsers()
                .first()
                .subscribe((user: UserEntity | null) => {
                    if (user === null) {
                        subscriber.next(false);
                        subscriber.complete();
                    } else {
                        subscriber.next(true);
                        this.setUser(null);
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
        return this.rest
            .getUsers()
            .map((resp: Response) => {
                let entity = _.find(resp.json(), {email: email});
                if (!entity) {
                    // this fakes a resource invalid error.
                    resp.status = 401;
                    throw resp;
                }
                this.setUser(entity, remember);
                return entity;
            });
    }
}
