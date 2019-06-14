import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/client.model';
import { ClientService } from 'src/app/shared/client.service';

@Component({
  selector: 'app-cont',
  templateUrl: './cont.component.html',
  styles: []
})
export class ContComponent implements OnInit {
  clientList:Client[];
  constructor( private clientService:ClientService) { }

  ngOnInit() {
    this.clientService.getClientList().then(res=> this.clientList = res as Client[]);
  }

}
