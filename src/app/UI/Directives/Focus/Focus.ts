import {AfterContentInit, ChangeDetectorRef, Directive, ElementRef, Input, NgZone} from '@angular/core';
import {Changes} from '../../../Shared/Utils/Changes';

const DEFAULT_MAX_TRIES = 10;

/**
 * This directive is used in templates to set the focus of an input control after the template as finished rendering.
 */
@Directive({
    selector: '[ui-focus]'
})
export class FocusDirective implements AfterContentInit {

    @Input('ui-focus')
    public digests: number | string = 0;

    /**
     * Element
     */
    private $el: JQuery;

    private changes: Changes;

    /**
     * Constructor
     */
    public constructor(
        el: ElementRef,
        cdr: ChangeDetectorRef,
        zone: NgZone
    ) {
        this.changes = new Changes(cdr, zone);
        this.$el = $(el.nativeElement);
    }

    public ngAfterContentInit(): void {
        const maxTries = ~~this.digests <= 0 ? DEFAULT_MAX_TRIES : ~~this.digests;
        this.setFocus(maxTries, 0);
    }

    protected setFocus(max: number, count: number) {
        if (count >= max) {
            return;
        }
        this.changes.laterMark(() => {
            let input = this.$el.find('input,select,textarea')
                .addBack('input,select,textarea')
                .first();

            if (input.length) {
                input.focus();
                return;
            }

            this.setFocus(max, count + 1);
        });
    }
}
