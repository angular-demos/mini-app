import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../Shared/Shared';
import {UIModule} from '../UI/UI';
import {COMPONENTS} from './Components/Components';
import {UsersRoutesModule} from './UsersRoutes';

@NgModule({
    imports: [
        CommonModule,
        UIModule,
        SharedModule,
        UsersRoutesModule
    ],
    declarations: [
        COMPONENTS
    ]
})
export class UsersModule {
}
