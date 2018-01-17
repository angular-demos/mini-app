import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {COMPONENTS} from './Components/Components';
import {UsersRoutesModule} from './UsersRoutes';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutesModule
  ],
  declarations: [
    COMPONENTS
  ]
})
export class UsersModule {
}
