import {animate, style, transition, trigger} from '@angular/animations';
import {Component, HostBinding, Input} from '@angular/core';

/**
 * Displays a horizontal line across the top of the browser that represents HTTP IO operations.
 */
@Component({
    selector: 'ui-loading-bar',
    styleUrls: ['./LoadingBar.scss'],
    templateUrl: './LoadingBar.html',
    animations: [
        trigger('animate-bar', [
            transition('end=>start', [
                style({width: '0%'}),
                animate('32s 0.5s cubic-bezier(.01,.55,.45,1)', style({width: '100%'}))
            ]),
            transition('start=>end', [
                style({opacity: 1, width: '*'}),
                animate('0.3s ease-out', style({opacity: 0, width: '100%'}))
            ])
        ])
    ]
})
export class LoadingBarComponent {
    @Input()
    public position: string = 'top';

    @Input()
    @HostBinding('class.active')
    public active: boolean = false;

    @HostBinding('class.top')
    protected get isTop(): boolean {
        return this.position === 'top';
    }
}
