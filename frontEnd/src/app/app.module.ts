import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS,} from '@angular/common/http';
//import { ToastrModule } from 'ngx-toastr';
import {BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// material angular 
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTreeModule, MatIconModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FacturesComponent } from './factures/factures.component';
import { FactureComponent } from './factures/facture/facture.component';
import { FactureDetailsComponent } from './factures/facture-details/facture-details.component';
import { FactureService } from './shared/facture.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { PageAccuielComponent } from './page-accuiel/page-accuiel.component';
import {MatNativeDateModule} from '@angular/material';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './clients/client/client.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { FinalClientComponent } from './final-client/final-client.component';
import { ContratComponent } from './contrats/contrat/contrat.component';
import { ClientService } from './shared/client.service';
import {MatButtonModule,MatSnackBarModule} from '@angular/material';
import { FinalClientsComponent } from './final-client/final-clients/final-clients.component';
import { ContratsComponent } from './contrats/contrats.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ListeComponent } from './final-client/liste/liste.component';
import { ContComponent } from './contrats/cont/cont.component';  
  //
  import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
  import {TranslateModule} from '@ngx-translate/core';
  import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SlidebarComponent } from './layout/components/slidebar/slidebar.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { ChatComponent } from './page-accuiel/components/chat/chat.component';
import { NotificationComponent } from './page-accuiel/components/notification/notification.component';
import { TimelineComponent } from './page-accuiel/components/timeline/timeline.component';
import { PageHeaderComponent } from './shared/modules/page-header/page-header.component';
import { StatComponent } from './shared/modules/stat/stat.component';
import { ChartsComponent } from './charts/charts.component';
import { ChartsModule } from 'ng2-charts';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './shared/user.service';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

  @NgModule({
  declarations: [
    AppComponent,
    FacturesComponent,
    FactureComponent,
    FactureDetailsComponent,
    PageAccuielComponent,
    ClientsComponent,
    ClientComponent,
    ClientDetailsComponent,
    FinalClientComponent,
    ContratComponent,
    FinalClientsComponent,
    ContratsComponent,
    ListeComponent,
    ContComponent,
    SlidebarComponent,
    HeaderComponent,
    ChatComponent,
    NotificationComponent,
    TimelineComponent,
    PageHeaderComponent,
    StatComponent,
    ChartsComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgbDropdownModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    MatTreeModule, MatIconModule, MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    DatePickerModule,
    MatInputModule,
    MatMomentDateModule,
    MatDatepickerModule,MatCardModule,
    NgbModule,TranslateModule.forRoot(),
    ChartsModule,LanguageTranslationModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    NgbCarouselModule,
    NgbAlertModule
    
  ],

  entryComponents:[FactureDetailsComponent, ClientDetailsComponent,ContratComponent],
 
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },FactureService,ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
