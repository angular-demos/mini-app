import {browser, by, element} from 'protractor';

export class MainPage {
    public getUsersInfoNameElement() {
        return element(by.css('app-main users-info a'));
    }
}
