import {ElementRef, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

/**
 * A helper class that assists with the setting and updating of a CSS style class on an element. Handles the removing
 * of the previous value, and setting of the new value.
 */
export class CssClass implements OnChanges {
    /**
     * Separates the prefix which makes it easier to detect empty values.
     */
    private prefix: string;

    /**
     * The property name to use when reading SimpleChanges
     */
    private property: string;

    /**
     * The current value.
     */
    private value: string;

    /**
     * A list of values that are not allowed as values.
     */
    private reserved: string[];

    /**
     * Constructor
     */
    public constructor(
        private elRef: ElementRef,
        private renderer: Renderer2,
        prefix?: string,
        property?: string,
        reserved?: string[]
    ) {
        this.prefix = prefix || null;
        this.property = property || null;
        this.reserved = reserved || [];
    }

    /**
     * Removes the old CSS class and applies the new CSS class on the element.
     */
    public setValue(value: string): this {
        if (value === this.value) {
            return;
        }
        if (this.value) {
            this.renderer.removeClass(this.elRef.nativeElement, this.getCssClass(this.value));
            this.value = null;
        }
        if (value && this.reserved.indexOf(value) === -1) {
            this.renderer.addClass(this.elRef.nativeElement, this.getCssClass(value));
        }
        this.value = value;
        return this;
    }

    /**
     * Will render changes
     */
    public ngOnChanges(changes: SimpleChanges): void {
        if (this.property) {
            throw new Error('property not set');
        }
        if (this.property in changes) {
            this.setValue(changes[this.property].currentValue);
        }
    }

    /**
     * Returns the CSS class with prefix.
     */
    private getCssClass(value: string): string {
        if (this.prefix) {
            return this.prefix + value;
        }
        return value;
    }
}
