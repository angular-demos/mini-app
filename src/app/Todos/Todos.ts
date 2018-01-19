import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../Shared/Shared';
import {UIModule} from '../UI/UI';
import {COMPONENTS} from './Components/Components';
import {PIPES} from './Pipes/Pipes';
import {RESOLVERS} from './Resolvers/Resolvers';
import {TodosRoutesModule} from './TodosRoutes';

@NgModule({
    imports: [
        CommonModule,
        UIModule,
        SharedModule,
        TodosRoutesModule
    ],
    declarations: [
        COMPONENTS,
        PIPES
    ],
    providers: [
        RESOLVERS
    ]
})
export class TodosModule {
}
