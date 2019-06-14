import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturesComponent } from './factures/factures.component';
import { FactureComponent } from './factures/facture/facture.component';
import { PageAccuielComponent } from './page-accuiel/page-accuiel.component';
import { ClientComponent } from './clients/client/client.component';
import { FinalClientComponent } from './final-client/final-client.component';

import { ClientsComponent } from './clients/clients.component';
import { FinalClientsComponent } from './final-client/final-clients/final-clients.component';
import { ContratComponent } from './contrats/contrat/contrat.component';
import { ContratsComponent } from './contrats/contrats.component';
import { ListeComponent } from './final-client/liste/liste.component';
import { ContComponent } from './contrats/cont/cont.component';
import { ChartsComponent } from './charts/charts.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  //{ path: '', loadChildren: './home/home.module#HomeModule', canActivate: [AuthGuard] },
  //{path:'/user/login',redirectTo:'/user/login'},
  { path: 'home', component: HomeComponent },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
{path:'', redirectTo:'page-accuiel',pathMatch:'full'},
 // {path:'', redirectTo:'facture',pathMatch:'full', canActivate: [AuthGuard]},
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
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
