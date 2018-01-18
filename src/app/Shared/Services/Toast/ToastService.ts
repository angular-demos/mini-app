import {Injectable, NgZone} from '@angular/core';
import * as _ from 'lodash';
import {Subject} from 'rxjs/Subject';
import {environment} from '../../../../environments/environment';
import {ToastInfo} from './ToastInfo';

/**
 * This service handles the displaying of toast messages in the upper corner of the app.
 */
@Injectable()
export class ToastService {
    /**
     * Emits toast messages that need to be displayed.
     */
    public messages: Subject<ToastInfo> = new Subject();

    /**
     * When debug is enabled zone level errors are converted into toast alerts. This makes development easier
     * as you see the errors without the console having to be opened.
     */
    private debug: boolean = !environment.production;

    /**
     * Constructor
     */
    public constructor(private zone: NgZone) {
        if (this.debug) {
            this.zone.onError.subscribe((error) => {

                if (_.isString(error)) {
                    this.danger(error);
                    return;
                }

                if (_.isObject(error)) {
                    // this value exists on an Observable uncaught error.
                    if ('rejection' in error) {
                        console.error('Zone Error:', error['rejection']);
                    }
                    if ('message' in error) {
                        this.danger(error['message']);
                        return;
                    }
                }

                this.danger('Unhandled zone error');
            });
        }
    }

    /**
     * Emits a success toast message.
     */
    public success(message: string, title?: string, icon?: string) {
        this.add(new ToastInfo(ToastInfo.Success, message, {
            title: title || 'Success',
            icon: icon || 'fa-check-circle-o'
        }));
    }

    /**
     * Emits an info toast message.
     */
    public info(message: string, title?: string, icon?: string) {
        this.add(new ToastInfo(ToastInfo.Info, message, {
            title: title || 'Notice',
            icon: icon || 'fa-info-circle'
        }));
    }

    /**
     * Emits a warning toast message.
     */
    public warning(message: string, title?: string, icon?: string) {
        this.add(new ToastInfo(ToastInfo.Warning, message, {
            title: title || 'Warning',
            icon: icon || 'fa-asterisk'
        }));
    }

    /**
     * Emits a danger toast message.
     */
    public danger(message: string, title?: string, icon?: string) {
        this.add(new ToastInfo(ToastInfo.Danger, message, {
            title: title || 'Error',
            icon: icon || 'fa-exclamation-triangle'
        }));
    }

    /**
     * Emits a new toast message.
     */
    public add(info: ToastInfo) {
        this.zone.run(() => {
            this.messages.next(info);
        });
    }
}
