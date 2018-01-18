import {EventEmitter, Injectable} from '@angular/core';
import {Headers, Http, Request, RequestMethod, Response, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {ToastService} from '../Toast/ToastService';
import {DataMap} from './RestTypes';

const MAX_SERVER_ERRORS = 3;
const MAX_CONNECTION_SECTIONS = 30;
const CONNECTION_WARNING = 10;
const RETRY_DELAY = 1000;

@Injectable()
export class RestService {
    /**
     * Emits busy flags of when a REST request is being made.
     */
    public busy: EventEmitter<boolean> = new EventEmitter();

    /**
     * A count of active HTTP verbs.
     */
    private verbs: { [name: string]: number } = {};

    /**
     * The number of active requests.
     */
    private active: number = 0;

    /**
     * Headers for all requests.
     */
    private headers: Headers;

    /**
     * Must receive a configuration object used to create the ngModel.
     */
    public constructor(
        private http: Http,
        private toast: ToastService
    ) {
        this.headers = void(0);
    }

    /**
     * True of the response content type is JSON.
     */
    private static isJson(value: Response): boolean {
        return /\bapplication\/json\b/.test(value.headers.get('Content-Type'));
    }

    /**
     * @deprecated Use back end hooks to change headers.
     */
    public setHeaders(headers?: Headers): this {
        this.headers = headers || void(0);
        return this;
    }

    /**
     * Executor of all REST requests.
     */
    public execute(
        method: RequestMethod,
        url: string,
        body?: DataMap,
        params?: string | URLSearchParams,
        headers?: Headers
    ): Observable<Response> {

        let req = new Request({
            method,
            params,
            body,
            url: url,
            headers: headers || this.headers,
            responseType: ResponseContentType.Json
        });

        this.verbs[method] = ~~this.verbs[method] + 1;
        this.onStart();
        const startTime = Date.now();

        return this.http.request(req)
            .retryWhen((errors: Observable<Response | Error>) => {
                return errors.scan((errorCount: number, error: Response | Error) => {
                    if (error instanceof Response) {
                        if (error.status >= 400 && error.status <= 499
                            || error.status === 500) {
                            throw error;
                        }
                        if (errorCount % CONNECTION_WARNING === 0) {
                            this.toast.warning(
                                'An attempt to connect to the server has fail. ' +
                                'Will keep trying to connect to the server.',
                                'Connection Warning',
                                'fa-signal'
                            );
                        }
                        return errorCount + 1;
                    }
                    throw error;
                }, 0).delay(RETRY_DELAY);
            })
            .catch((error: Response | Error) => {
                if (error instanceof Response) {
                    if (error.status === 0) {
                        this.toast.danger(
                            'Unable to connect to the server. Ensure you are connected to the internet.',
                            'Connection Error',
                            'fa-signal'
                        );
                    } else if (!RestService.isJson(error)) {
                        this.toast.danger(
                            'Server gave an invalid response type.',
                            'Unsupported Response'
                        );
                    }
                } else {
                    this.toast.danger(error.message);
                }
                throw error;
            })
            .map((value: Response) => {
                if (!RestService.isJson(value) || value.status < 199) {
                    this.toast.danger(
                        'Server gave a response that is not supported by the client.',
                        'Unsupported Response',
                        'fa-exclamation-triangle'
                    );
                    throw value;
                }
                return value;
            })
            .finally(() => {
                this.onStop(method);
            })
            .share()
            .take(1);
    }

    protected onStart(): void {
        if (this.active === 0) {
            this.busy.next(true);
        }
        this.active++;
    }

    protected onStop(method: RequestMethod): void {
        this.active--;
        this.verbs[method] = ~~this.verbs[method] - 1;
        if (this.active === 0) {
            this.busy.next(false);
        }
        if (this.active < 0 || this.verbs[method] < 0) {
            this.active = 0;
            this.verbs[method] = 0;
            console.error('Reference count out of range.');
        }
    }
}
