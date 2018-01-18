import {Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Changes} from '../../../Shared/Utils/Changes';

const RESERVED_NAMES = ['fa', 'fa-fw', 'fa-spin'];

@Directive({
    selector: 'ui-icon'
})
export class IconDirective implements OnChanges {

    @Input()
    public name: string = 'fa-cogs';

    @Input()
    public spin: boolean = false;

    @Input()
    public fw: boolean = false;

    @HostBinding('class.fa')
    public fontAwesome: boolean = true;

    @HostBinding('class.fa-spin')
    public get isSpinning(): boolean {
        return this.spin;
    }

    @HostBinding('class.fa-pulse')
    public get isPulsing(): boolean {
        return this.spin && this.name === 'fa-spinner';
    }

    @HostBinding('class.fa-fw')
    public get isFw(): boolean {
        return this.fw;
    }

    private $el: JQuery;

    public constructor(elRef: ElementRef) {
        this.$el = $(elRef.nativeElement);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        Changes.on<string>(changes, 'name', (newValue, oldValue) => {
            if (oldValue && RESERVED_NAMES.indexOf(oldValue) === -1) {
                this.$el.removeClass(oldValue);
            }
            if (newValue && RESERVED_NAMES.indexOf(newValue) === -1) {
                this.$el.show().addClass(newValue);
            } else {
                this.$el.hide();
            }
        });
    }
}
