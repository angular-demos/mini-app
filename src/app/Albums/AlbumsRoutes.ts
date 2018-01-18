import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlbumsComponent} from './Components/Albums/Albums';

const routes: Routes = [
    {path: '', component: AlbumsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlbumsRoutesModule {
}
