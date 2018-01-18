import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {DIRECTIVES} from './Directives/Directives';
import {SERVICES} from './Services/Services';

@NgModule({
    imports: [
        HttpModule
    ],
    declarations: [
        DIRECTIVES
    ],
    exports: [
        DIRECTIVES
    ]
})
export class SharedModule {
    public static forRoot() {
        return {
            ngModule: SharedModule,
            providers: [
                SERVICES
            ]
        };
    }
}
