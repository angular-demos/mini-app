import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewComponent} from './Components/View/View';
import {ToDosResolver} from './Resolvers/ToDosResolver';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/todos/view',
        pathMatch: 'full'
    },
    {
        path: 'view',
        component: ViewComponent,
        resolve: {
            ToDos: ToDosResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodosRoutesModule {
}
