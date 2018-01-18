import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../Shared/Shared';
import {UIModule} from '../UI/UI';
import {COMPONENTS} from './Components/Components';
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
        COMPONENTS
    ],
    providers: [
        RESOLVERS
    ]
})
export class TodosModule {
}
