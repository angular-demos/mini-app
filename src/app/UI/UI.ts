import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../Shared/Shared';
import {COMPONENTS} from './Components/Components';
import {DIRECTIVES} from './Directives/Directives';
import {PIPES} from './Pipes/Pipes';
import {WINDOW} from './Types/WindowToken';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [
        COMPONENTS,
        DIRECTIVES,
        PIPES
    ],
    providers: [
        {provide: WINDOW, useValue: window}
    ],
    exports: [
        COMPONENTS,
        DIRECTIVES,
        PIPES,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ]
})
export class UIModule {
}
