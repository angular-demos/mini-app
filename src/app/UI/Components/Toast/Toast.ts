import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ToastInfo} from '../../../Shared/Services/Toast/ToastInfo';
import {ToastService} from '../../../Shared/Services/Toast/ToastService';

/**
 * This component renders the toast messages emitted by the toast service.
 */
@Component({
    selector: 'ui-toast',
    styleUrls: ['./Toast.scss'],
    templateUrl: './Toast.html'
})
export class ToastComponent implements OnDestroy {
    /**
     * A list of toast messages to be displayed.
     */
    public queue: ToastInfo[] = [];

    /**
     * Subscription for the toast service.
     */
    private toastSubscription: Subscription;

    /**
     * Constructor
     */
    public constructor(private toast: ToastService) {
        this.toastSubscription = toast.messages.subscribe((info: ToastInfo) => {
            this.queue.unshift(info);
            if (info.timeout !== 0) {
                setTimeout(() => {
                    this.remove(info);
                }, info.timeout * 1000);
            }
        });
    }

    /**
     * Remove subscription
     */
    public ngOnDestroy(): void {
        this.toastSubscription.unsubscribe();
    }

    /**
     * Remove a toast message.
     */
    public remove(info: ToastInfo) {
        const indx: number = this.queue.indexOf(info);
        if (indx !== -1) {
            this.queue.splice(indx, 1);
        }
    }

    /**
     * Used by the ngFor in the template.
     */
    public trackItem(indx: number, item: ToastInfo): number {
        return item.id;
    }
}
