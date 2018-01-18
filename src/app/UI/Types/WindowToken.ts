import {InjectionToken} from '@angular/core';

/**
 * A DI Token representing the browser window.
 */
export const WINDOW = new InjectionToken<Window>('ui-window-token');
