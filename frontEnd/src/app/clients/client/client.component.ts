import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientService } from 'src/app/shared/client.service';
import { ClientDetailsComponent } from '../client-details/client-details.component';
import { MatSnackBar } from "@angular/material";



@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styles: []
})
export class ClientComponent implements OnInit {
  isValid : boolean = true;
  clientList;
  constructor(private service:ClientService,
    private router:Router,
    private dialog:MatDialog,
    private currentRoute: ActivatedRoute,
    public snackBar: MatSnackBar) { }
    ID : string=null;

  ngOnInit() {

    this.service.getClientList().then(res=>this.clientList = res);
    this.resetForm();

      let client_id = this.currentRoute.snapshot.paramMap.get('id');
      this.ID = client_id;
   if (client_id == null)
      this.resetForm();
    else {
      this.service.getClientByID(parseInt(client_id)).then(res => {
        this.service.formData = res.client;
        this.service.clientDetails = res.clientDetails;
      });
    }

  }
  state()
  {  
    return this.ID != null;
   
  }
  resetForm(form?:NgForm){
 
    if(form = null)
    this.resetForm(form);
    this.service.formData = {
    client_id:null,
    client_nom :'',
    client_adresse:'',
    client_siret:'',
    client_TVA:0,
    client_email:'',
    DeletedDetailClientIDs:''
    };
    this.service.clientDetails= [];
  }

    
   AddOrEditClientFinal(clientDetailIndex,client_id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { clientDetailIndex,client_id };
    this.dialog.open(ClientDetailsComponent, dialogConfig);
   
  }


  onDeleteDetailClient(clientDetailID: number, i: number) {
    if (clientDetailID != null)
    this.service.formData.DeletedDetailClientIDs += clientDetailID + ",";
    this.service.clientDetails.splice(i, 1);
  }
 

    onSubmit(form: NgForm) {
    if(this.validateForm() && this.service.formData.client_id == null){this.service.saveClient().subscribe(res => {
        this.resetForm();
        this.openSnackBar('CLIENT', 'Submitted Successfully');
        this.router.navigate(['/clients']);
      })
    }  
    else{
      this.service.updateClient().subscribe(res => {
        this.resetForm();
        this.openSnackBar('CLIENT', 'Modifiée avec Successfully');
        this.router.navigate(['/clients']);
      })
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 3000,
       verticalPosition: 'bottom',
      
    
    });
 }
 validateForm() {
  this.isValid = true;
  let i = 0;
  while ((i < this.clientList.length) && (parseInt(this.service.formData.client_siret) != parseInt(this.clientList[i].client_siret))) 
    i++;  
  
  if (i < this.clientList.length) 
    this.isValid = false;
  
  return this.isValid;
  

  
    
} 



  }//fin de la classe☺?



