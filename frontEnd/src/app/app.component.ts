import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  collapedSideBar: boolean;
  title = 'App de Facturation';
  receiveCollapsed($event) {
    this.collapedSideBar = $event;
}
}
