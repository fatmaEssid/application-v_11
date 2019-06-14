import { Component, OnInit } from '@angular/core';
import { ClientService } from '../shared/client.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FinalClientService } from '../shared/final-client.service';
import { ContratService } from '../shared/contrat.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styles: []
})
export class ClientsComponent implements OnInit {
clientList;
  constructor(private service: ClientService,
    private router:Router, 
    private serviceContrat : ContratService,
    private finalClientService: FinalClientService,private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.serviceContrat.refreshList();
   this.refreshList();
   this.finalClientService.refreshList();
  }
  refreshList() {
    this.service.getClientList().then(res=>this.clientList = res);
  }

  openOrEdit(ID:number){
    this.router.navigate(['/client/edit/' + ID]);

  }
  onDeleteClient(id: number) {
    if(!this.flashing(id))
    alert('On ne peut pas supprimé cet prestataire car il est déja utilisé 👮');
    else if (confirm('Vous êtes sûr  pour supprimer le client ?')) {
      this.service.deleteClient(id).then(res => {
        this.refreshList();
        this.openSnackBar('CLIENT', 'supprimé avec succès ');
      });
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 4000,
       verticalPosition: 'top',
    
    });

}
flashing(id :number){
    
  let i = 0;
  
while ((i < this.serviceContrat.list.length) && (id != (this.serviceContrat.list[i].client_id))) 
i++;  

if (i < this.serviceContrat.list.length) 
return false;
 else
 return true;    
  
}
}
