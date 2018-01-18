import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../Shared/Shared';
import {UIModule} from '../UI/UI';
import {UsersModule} from '../Users/Users';
import {COMPONENTS} from './Components/Components';
import {MainRoutesModule} from './MainRoutes';

@NgModule({
    imports: [
        CommonModule,
        UIModule,
        UsersModule,
        SharedModule,
        MainRoutesModule
    ],
    declarations: [
        COMPONENTS
    ]
})
export class MainModule {
}
