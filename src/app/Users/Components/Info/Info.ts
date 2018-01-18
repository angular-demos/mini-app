import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'users-info',
    templateUrl: './Info.html',
    styleUrls: ['./Info.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent {
    /**
     * The user's name.
     */
    @Input()
    public name: string;

    /**
     * A link for the user's website.
     */
    @Input()
    public url: string;

    /**
     * The user's company name.
     */
    @Input()
    public company: string;
}
