import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AlbumsModule} from './Albums/Albums';
import {BodyComponent} from './Main/Components/Body/Body';

import {MainModule} from './Main/Main';
import {PostsModule} from './Posts/Posts';
import {SharedModule} from './Shared/Shared';
import {TodosModule} from './Todos/Todos';
import {UsersModule} from './Users/Users';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AlbumsModule,
        MainModule,
        PostsModule,
        TodosModule,
        UsersModule,
        SharedModule.forRoot()
    ],
    bootstrap: [
        BodyComponent
    ]
})
export class AppModule {
}
