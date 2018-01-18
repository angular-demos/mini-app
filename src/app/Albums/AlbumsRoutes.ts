import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewComponent} from './Components/View/View';
import {AlbumsResolver} from './Resolvers/AlbumsResolver';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/albums/view',
        pathMatch: 'full'
    },
    {
        path: 'view',
        component: ViewComponent,
        resolve: {
            Albums: AlbumsResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlbumsRoutesModule {
}
