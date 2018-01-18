import {Directive, ElementRef, HostBinding, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';
import {Changes} from '../../../Shared/Utils/Changes';

const RESERVED_NAMES = ['fa', 'fa-fw', 'fa-spin'];

/**
 * This is a wrapper directive for Font Awesome icons.
 */
@Directive({
    selector: 'ui-icon'
})
export class IconDirective implements OnChanges {

    /**
     * Name of the font CSS class
     */
    @Input()
    public name: string = 'fa-cogs';

    /**
     * True to spin the icon.
     */
    @Input()
    public spin: boolean = false;

    /**
     * Enable fixed width
     */
    @Input()
    public fw: boolean = false;

    /**
     * Defaults to font awesome icons.
     */
    @HostBinding('class.fa')
    public fontAwesome: boolean = true;

    /**
     * Constructor
     */
    public constructor(private el: ElementRef, private render: Renderer2) {
    }

    /**
     * Enables spinning
     */
    @HostBinding('class.fa-spin')
    public get isSpinning(): boolean {
        return this.spin;
    }

    /**
     * Enables pulsing animation.
     */
    @HostBinding('class.fa-pulse')
    public get isPulsing(): boolean {
        return this.spin && this.name === 'fa-spinner';
    }

    /**
     * Enables fixed width.
     */
    @HostBinding('class.fa-fw')
    public get isFw(): boolean {
        return this.fw;
    }

    /**
     * Handles changes to the CSS class.
     */
    public ngOnChanges(changes: SimpleChanges): void {
        Changes.on<string>(changes, 'name', (newValue, oldValue) => {
            if (oldValue && RESERVED_NAMES.indexOf(oldValue) === -1) {
                this.render.removeClass(this.el.nativeElement, oldValue);
            }
            if (newValue && RESERVED_NAMES.indexOf(newValue) === -1) {
                this.render.addClass(this.el.nativeElement, newValue);
            }
        });
    }
}
