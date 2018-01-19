import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ToastInfo} from '../../../Shared/Services/Toast/ToastInfo';
import {ToastService} from '../../../Shared/Services/Toast/ToastService';

/**
 * This component renders the toast messages emitted by the toast service.
 */
@Component({
    selector: 'ui-toast',
    styleUrls: ['./Toast.scss'],
    templateUrl: './Toast.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent implements OnDestroy {
    /**
     * Toggle displaying toasts as popups or in-page blocks.
     */
    @Input()
    @HostBinding('class.stack')
    public stack: boolean = true;

    /**
     * A list of toast messages to be displayed.
     */
    public queue: ToastInfo[] = [];

    /**
     * Subscription for the toast service.
     */
    private toastSubscription: Subscription;

    /**
     * True when the component view has detached.
     */
    private distroyed: boolean = false;

    /**
     * Constructor
     */
    public constructor(private toast: ToastService, private change: ChangeDetectorRef) {
        this.toastSubscription = toast.messages.share().subscribe((info: ToastInfo) => {
            this.queue.unshift(info);
            if (info.timeout !== 0) {
                info.handle = setTimeout(() => {
                    this.remove(info);
                }, info.timeout * 1000);
            }
            this.change.detectChanges();
        });
    }

    /**
     * Remove subscription
     */
    public ngOnDestroy(): void {
        this.distroyed = true;
        this.toastSubscription.unsubscribe();
        this.queue
            .filter((info) => info.handle !== null)
            .forEach((info) => {
                clearTimeout(info.handle);
            });
        this.queue = [];
    }

    /**
     * Remove a toast message.
     */
    public remove(info: ToastInfo) {
        console.log('remove', info, this.distroyed);
        const indx: number = this.queue.indexOf(info);
        if (indx !== -1) {
            this.queue.splice(indx, 1);
        }
        if (!this.distroyed) {
            this.change.detectChanges();
            this.change.markForCheck();
        }
    }

    /**
     * Used by the ngFor in the template.
     */
    public trackItem(indx: number, item: ToastInfo): number {
        return item.id;
    }
}
