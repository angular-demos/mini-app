import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MainModule} from './Main/Main';
import {MainComponent} from './Main/Components/Main/Main';
import {UsersModule} from './Users/Users';

@NgModule({
  imports: [
    BrowserModule,
    MainModule,
    UsersModule
  ],
  bootstrap: [
    MainComponent
  ]
})
export class AppModule {
}
