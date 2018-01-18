import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../Shared/Shared';
import {UIModule} from '../UI/UI';
import {COMPONENTS} from './Components/Components';
import {PostsRoutesModule} from './PostsRoutes';

@NgModule({
    imports: [
        CommonModule,
        UIModule,
        SharedModule,
        PostsRoutesModule
    ],
    declarations: [
        COMPONENTS
    ]
})
export class PostsModule {
}
