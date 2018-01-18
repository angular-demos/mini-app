import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserGuard} from '../Users/Guards/UserGuard';
import {MainComponent} from './Components/Main/Main';
import {NotFoundComponent} from './Components/NotFound/NotFound';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/posts',
        pathMatch: 'full'
    }, {
        path: '',
        component: MainComponent,
        canActivate: [UserGuard],
        canActivateChild: [UserGuard],
        children: [
            {path: 'albums', loadChildren: 'app/Albums/Albums#AlbumsModule'},
            {path: 'todos', loadChildren: 'app/Todos/Todos#TodosModule'},
            {path: 'posts', loadChildren: 'app/Posts/Posts#PostsModule'}
        ]
    },
    {
        path: 'users', loadChildren: 'app/Users/Users#UsersModule'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class MainRoutesModule {
}
