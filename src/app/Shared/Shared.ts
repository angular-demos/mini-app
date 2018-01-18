import {NgModule} from '@angular/core';
import {DIRECTIVES} from './Directives/Directives';
import {SERVICES} from './Services/Services';

@NgModule({
    imports: [],
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
