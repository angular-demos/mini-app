import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './Components/Main/Main';
import {NotFoundComponent} from './Components/NotFound/NotFound';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {path: 'albums', loadChildren: 'app/Albums/Albums#AlbumsModule'},
            {path: 'todos', loadChildren: 'app/Todos/Todos#TodosModule'},
            {path: 'posts', loadChildren: 'app/Posts/Posts#PostsModule'},
            {path: 'users', loadChildren: 'app/Users/Users#UsersModule'}
        ]
    },
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class MainRoutesModule {
}
