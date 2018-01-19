import {browser, by, element, protractor} from 'protractor';
import {MainPage} from './main.po';
import {UsersLoginPage} from './users.login.po';

describe('Users features', () => {
    let users: UsersLoginPage;
    let main: MainPage;

    beforeEach(() => {
        users = new UsersLoginPage();
        main = new MainPage();
    });

    it('perform a successful log in', () => {
        users.navitageTo();
        expect(users.getH2Element().getText()).toEqual('Please sign in');

        let email = 'Lucio_Hettinger@annie.ca';
        let name = 'Chelsey Dietrich';
        users.getEmailElement().clear();
        users.getEmailElement().sendKeys(email);
        expect(users.getEmailElement().getAttribute('value')).toEqual(email);

        users.getSubmitElement().click();
        expect(browser.getCurrentUrl()).toMatch(/\/posts\/view$/);

        // user data is lazy loaded so this just waits for 5 seconds.
        browser.wait(
            protractor.ExpectedConditions.textToBePresentInElement(main.getUsersInfoNameElement(), name),
            5000,
            'Timeout waiting for user info.'
        );
    });
});
