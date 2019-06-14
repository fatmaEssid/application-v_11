import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { FacturesComponent } from '../factures/factures.component';
import { FactureComponent } from '../factures/facture/facture.component';
import { ClientsComponent } from '../clients/clients.component';
import { ClientComponent } from '../clients/client/client.component';
import { ChartsComponent } from '../charts/charts.component';
import { ListeComponent } from '../final-client/liste/liste.component';
import { ContComponent } from '../contrats/cont/cont.component';
import { PageAccuielComponent } from '../page-accuiel/page-accuiel.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'prefix' },
            {path:'factures', component:FacturesComponent},
  {path:'facture', component:FactureComponent},
  {path:'clients', component:ClientsComponent},
  {path:'client', component:ClientComponent},
  {path:'charts', component:ChartsComponent},
  {path:'final-clients', component:ListeComponent},
  {path:'contrats', component:ContComponent},

  {path:'page-accuiel', component:PageAccuielComponent},
  {path:'facture', children:[
    {path:'', component:FactureComponent},
    {path:'edit/:id', component:FactureComponent}
  ]},
  {path:'client', children:[
    {path:'', component:ClientComponent},
    {path:'edit/:id', component:ClientComponent}
  ]},
  {path:'final-clients', children:[
    {path:'', component:ListeComponent},
    {path:'edit/:id', component:ListeComponent}
  ]},
  {path:'contrats', children:[
    {path:'', component:ContComponent},
    {path:'edit/:id', component:ContComponent}
  ]}
          
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}