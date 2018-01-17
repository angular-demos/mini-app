import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './Components/Main/Main';
import {MainRoutesModule} from './MainRoutes';

@NgModule({
  imports: [
    CommonModule,
    MainRoutesModule
  ],
  declarations: [
    MainComponent
  ]
})
export class MainModule {
}
