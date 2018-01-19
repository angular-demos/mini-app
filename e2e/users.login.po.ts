import { browser, by, element } from 'protractor';

export class UsersLoginPage {
  public navitageTo() {
    return browser.get('/users/login');
  }

  public getH2Element() {
      return element(by.css('h2'));
  }

  public getEmailElement() {
      return element(by.css('input[type=email]'));
  }

  public getSubmitElement() {
      return element(by.css('button[type=submit]'));
  }
}
