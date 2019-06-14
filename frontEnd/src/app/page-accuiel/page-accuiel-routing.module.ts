import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAccuielComponent } from './page-accuiel.component';

const routes: Routes = [
    {
        path: '', component: PageAccuielComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageAccuielRoutingModule {
}
