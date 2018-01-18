import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BodyComponent} from './Main/Components/Body/Body';

import {MainModule} from './Main/Main';
import {SharedModule} from './Shared/Shared';
import {UsersModule} from './Users/Users';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MainModule,
        UsersModule,
        SharedModule.forRoot()
    ],
    bootstrap: [
        BodyComponent
    ]
})
export class AppModule {
}
