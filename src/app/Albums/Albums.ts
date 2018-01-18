import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../Shared/Shared';
import {UIModule} from '../UI/UI';
import {AlbumsRoutesModule} from './AlbumsRoutes';
import {COMPONENTS} from './Components/Components';
import {RESOLVERS} from './Resolvers/Resolvers';

@NgModule({
    imports: [
        CommonModule,
        UIModule,
        SharedModule,
        AlbumsRoutesModule
    ],
    declarations: [
        COMPONENTS
    ],
    providers: [
        RESOLVERS
    ]
})
export class AlbumsModule {
}
