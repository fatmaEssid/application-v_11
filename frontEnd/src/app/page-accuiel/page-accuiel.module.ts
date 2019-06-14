import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { PageAccuielRoutingModule } from './page-accuiel-routing.module';
import { PageAccuielComponent } from './page-accuiel.component';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';
import { StatModule } from '../shared/modules';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        PageAccuielRoutingModule,
        StatModule
    ],
    declarations: [
        PageAccuielComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent,
    
    ]
})
export class PageAccuielModule {}
