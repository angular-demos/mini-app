import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Changes} from '../../../Shared/Utils/Changes';

/**
 * Assigns CSS class value without erasing existing values.
 *
 * For example: <div class="foo" [class]="bar"></div>
 *
 * The above results in class="bar" as the class binding overwrites the existing value. This directive solves that
 * problem.
 */
@Directive({
    selector: '[ui-class]'
})
export class ClassDirective implements OnChanges {
    @Input('ui-class')
    public clazz: string;

    private $el: JQuery;

    public constructor(elRef: ElementRef) {
        this.$el = $(elRef.nativeElement);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        Changes.on<string>(changes, 'clazz', (newValue: string, oldValue: string) => {
            if (oldValue) {
                this.$el.removeClass(oldValue);
            }
            if (newValue) {
                this.$el.addClass(newValue);
            }
        });
    }
}
