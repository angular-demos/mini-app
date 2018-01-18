import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../Shared/Shared';
import {UIModule} from '../UI/UI';
import {COMPONENTS} from './Components/Components';
import {PIPES} from './Pipes/Pipes';
import {PostsRoutesModule} from './PostsRoutes';
import {RESOLVERS} from './Resolvers/Resolvers';

@NgModule({
    imports: [
        CommonModule,
        UIModule,
        SharedModule,
        PostsRoutesModule
    ],
    declarations: [
        COMPONENTS,
        PIPES
    ],
    providers: [
        RESOLVERS
    ]
})
export class PostsModule {
}
