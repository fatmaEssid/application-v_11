import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


import { SlidebarComponent } from '../layout/components/slidebar/slidebar.component';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../layout/components/header/header.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        TranslateModule,
        NgbDropdownModule
    ],
    declarations: [HomeComponent, SlidebarComponent, HeaderComponent]
})
export class HomeModule {}
