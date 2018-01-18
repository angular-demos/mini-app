import {XHRBackend} from '@angular/http';
import {AuthService} from './Auth/AuthService';
import {RestService} from './Rest/RestService';
import {SharedBackend} from './SharedBackend/SharedBackend';
import {StorageService} from './Storage/StorageService';
import {ToastService} from './Toast/ToastService';

export const SERVICES = [
    {provide: XHRBackend, useClass: SharedBackend},
    AuthService,
    RestService,
    StorageService,
    ToastService
];
