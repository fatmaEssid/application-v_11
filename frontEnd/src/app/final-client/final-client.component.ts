import { Component, OnInit } from '@angular/core';
import { FinalClientService } from '../shared/final-client.service';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-final-client',
  templateUrl: './final-client.component.html',
  styles: []
})
export class FinalClientComponent implements OnInit {
  isValid : boolean = true;
  ETAT : boolean = true;
 
  constructor(private service:FinalClientService,
    private router:Router,public snackBar: MatSnackBar,private currentRouter:ActivatedRoute) { }
    ID : string=null;

  ngOnInit() {
    this.resetForm();  
    let idClient = this.currentRouter.snapshot.paramMap.get('id');
   this.ID=idClient;
  }
  state()
  {  
    return this.ID != null;
   
  }
  resetForm(form?:NgForm){
    if(form != null)
      form.resetForm;
    this.service.formData = {
      final_client_id:null,
      final_client_nom:'',
      final_client_adresse:'',
      final_client_contact:'',
      final_client_email:''
    };
  
  }
  /*
  resetForm(form? : NgForm){
    if(form!=null)
  form.resetForm;
  this.service.formData = {
    ID : null,
    Nom : '',
    Adresse : '',
    Code : '',
    Mobile : ''

  }
  }
  */
  onSubmit(form: NgForm){
   if (this.estExiste() && form.value.final_client_id == null) {
    this.insertRecord(form);
    
  }
    else{
      
    this. updateRecord(form);
    
  }
    
  }

      insertRecord(form: NgForm){
    this.service.postClient(form.value).subscribe(res => {
       this.openSnackBar('FINAL CLIENT', 'Bien Enregistrée');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm){
    this.service.putClient(form.value).subscribe(res => {
      this.openSnackBar('FINAL CLIENT', 'Modifié avec succès!');
      this.resetForm(form);
      this.service.refreshList();
    });
  }
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
         duration: 4000,
         verticalPosition: 'bottom',
        
         
      });
   }
   estExiste(){
    this.isValid = true;
    let i = 0;
    
      while ((i <  this.service.list.length) && (this.service.formData.final_client_nom !=  this.service.list[i].final_client_nom)) 
      i++;  
    
    if (i < this.service.list.length) 
      this.isValid = false;
   
  
    
    return this.isValid;
   } 
  
}
/*

 ngOnInit() {
    this.resetForm();
  }
  resetForm(form? : NgForm){
    if(form!=null)
  form.resetForm;
  this.service.formData = {
    ID : null,
    Nom : '',
    Adresse : '',
    Code : '',
    Mobile : ''

  }
  }

  onSubmit(form: NgForm){
    if (form.value.ID == null) 
    this.insertRecord(form);
    else
    this. updateRecord(form);
  }
  insertRecord(form: NgForm){
    this.service.postClient(form.value).subscribe(res => {
      this.toastr.success('Inséré avec succès!', 'Registre de client');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm){
    this.service.putClient(form.value).subscribe(res => {
      this.toastr.info('Modifié avec succès!', 'Registre de client');
      this.resetForm(form);
      this.service.refreshList();
    });
  }
 
  this.openSnackBar('FINAL CLIENT', 'Bien Enregistrée');
      this.router.navigate(['/final-clients']);
*/