import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../Shared/Shared';
import {UIModule} from '../UI/UI';
import {COMPONENTS} from './Components/Components';
import {GUARDS} from './Guards/Guards';
import {UsersRoutesModule} from './UsersRoutes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UIModule,
        SharedModule,
        UsersRoutesModule
    ],
    declarations: [
        COMPONENTS
    ],
    providers: [
        GUARDS
    ],
    exports: [
        COMPONENTS
    ]
})
export class UsersModule {
}
