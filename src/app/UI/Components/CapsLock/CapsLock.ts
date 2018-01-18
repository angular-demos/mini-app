import {Component, HostBinding, HostListener, Input} from '@angular/core';

@Component({
    selector: 'ui-caps-lock',
    styleUrls: ['./CapsLock.scss'],
    templateUrl: './CapsLock.html'
})
export class CapsLockComponent {
    @Input('title')
    public _title: string;

    @HostBinding('class.alert')
    public alert = true;

    @HostBinding('class.alert-warning')
    public warning = true;

    @HostBinding('class.hide')
    public isCapsOff = true;

    public getTitle(): string {
        return this._title
            ? this._title
            : 'Looks like your caps lock is on.';
    }

    @HostListener('document:keypress')
    public onKeyPress(e: any): void {
        e = e ? e : window.event;
        let kc = (e.keyCode) ? e.keyCode : e.which; // withPrefix keycode
        let isUp = kc >= 65 && kc <= 90; // uppercase
        let isLow = kc >= 97 && kc <= 122; // lowercase
        let isShift = (e.shiftKey) ? e.shiftKey : (kc === 16); // shift is pressed -- works for IE8-

        // uppercase w/out shift or lowercase with shift == caps lock
        this.isCapsOff = !((isUp && !isShift) || (isLow && isShift));
    }
}
