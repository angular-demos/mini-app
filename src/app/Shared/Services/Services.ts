import {XHRBackend} from '@angular/http';
import {SharedBackend} from './SharedBackend/SharedBackend';
import {ToastService} from './Toast/ToastService';

export const SERVICES = [
    {provide: XHRBackend, useClass: SharedBackend},
    ToastService
];
