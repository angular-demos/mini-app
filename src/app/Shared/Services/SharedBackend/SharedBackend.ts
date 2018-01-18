import {Injectable} from '@angular/core';
import {BrowserXhr, Request, ResponseOptions, XHRBackend, XHRConnection, XSRFStrategy} from '@angular/http';
import 'rxjs/add/operator/share';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

/**
 * Creates a proxy back-end that allows the front end to display feedback when HTTP IO operations are taking place.
 */
@Injectable()
export class SharedBackend extends XHRBackend {
    /**
     * Observers of connections.
     */
    public connections: Observable<XHRConnection>;

    /**
     * Emits connections.
     */
    private connectionEmitter: Subject<XHRConnection>;

    /**
     * Constructor
     */
    public constructor(_browserXHR: BrowserXhr, _baseResponseOptions: ResponseOptions, _xsrfStrategy: XSRFStrategy) {
        super(_browserXHR, _baseResponseOptions, _xsrfStrategy);

        this.connectionEmitter = new Subject();
        this.connections = this.connectionEmitter.share();
    }

    /**
     * Creates a new connection and emits it to observers.
     */
    public createConnection(request: Request): XHRConnection {
        let con = super.createConnection(request);
        this.connectionEmitter.next(con);
        return con;
    }
}
