import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    NgZone,
    OnChanges,
    Output,
    Renderer2,
    SimpleChanges
} from '@angular/core';
import {Timings} from '../../../Shared/Animations/Timings';
import {Changes} from '../../../Shared/Utils/Changes';

export const ALERT_COLORS = ['success', 'info', 'danger', 'warning'];

@Component({
    selector: 'ui-alert',
    styleUrls: ['./Alert.scss'],
    templateUrl: './Alert.html',
    animations: [
        trigger('animate-alert', [
            transition('void => 1', animate(Timings.easeOut(), keyframes([
                style({opacity: 0}),
                style({opacity: 1})
            ]))),
            transition('1 => void', animate(Timings.easeOut(), keyframes([
                style({opacity: 1}),
                style({opacity: 0})
            ])))
        ])
    ]
})
export class AlertComponent implements OnChanges, AfterContentInit {
    @Input()
    public title: string;

    @Input()
    public icon: string;

    @Input()
    public color: string = 'info';

    /**
     * Can the user close the alert.
     */
    @Input()
    public dismissible: boolean = false;

    /**
     * Perform animations
     */
    @Input()
    @HostBinding('@animate-alert')
    public animatable: boolean = true;

    /**
     * True when the alert is part of another components UI.
     */
    @Input()
    @HostBinding('class.ui-alert-nested')
    public nested: boolean = false;

    /**
     * An optional timeout value to close the alert.
     */
    @Input()
    public timeout: number = 0;

    /**
     * Emits True if closed by the user, or False if by timer.
     */
    @Output()
    public close: EventEmitter<boolean> = new EventEmitter();

    private timer: number = null;

    private el: HTMLElement;

    private changes: Changes;

    /**
     * Constructor
     */
    public constructor(
        elRef: ElementRef,
        private render: Renderer2,
        cdr: ChangeDetectorRef,
        zone: NgZone
    ) {
        this.el = elRef.nativeElement;
        this.changes = new Changes(cdr, zone);
    }

    public ngAfterContentInit(): void {
        this.setColor(this.color);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        Changes.on<number>(changes, 'timeout', (value) => {
            if (this.timer !== null) {
                window.clearTimeout(this.timer);
                this.timer = null;
            }
            if (value <= 0) {
                return;
            }
            this.timer = this.changes.delayedMark(() => {
                this.close.emit(false);
            }, value > 1000 ? value : (value * 1000));
        });

        Changes.on<string>(changes, 'color', (color: string) => this.setColor(color));
    }

    public onClose(): void {
        this.close.emit(true);
    }

    protected setColor(newValue: string, oldValue?: string) {
        if (oldValue && ALERT_COLORS.indexOf(oldValue) !== -1) {
            this.render.removeClass(this.el, 'ui-alert-' + oldValue);
        }
        if (newValue && ALERT_COLORS.indexOf(newValue) !== -1) {
            this.render.addClass(this.el, 'ui-alert-' + newValue);
        }
    }
}
