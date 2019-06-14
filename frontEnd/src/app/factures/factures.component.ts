import { Component, OnInit } from '@angular/core';
import { FactureService } from '../shared/facture.service';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { ContratService } from '../shared/contrat.service';
import { MatTableDataSource } from '@angular/material';
import { Facture } from '../shared/facture.model';
import { NgForm } from '@angular/forms';
import { SearchService } from '../shared/search.service';
@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls:['./factures.component.scss'],
  animations: [routerTransition()]
})
export class FacturesComponent implements OnInit {
factureList : Facture[];

filtre : any[];
contenu : number=0;
long : string='';
  constructor(private service:FactureService,
    private router:Router, private contratService:ContratService,private serviceSearch:SearchService) { }

  ngOnInit() {
    this.contratService.refreshList();
    
    this.service.getFactureList().then(res=>this.factureList = res as Facture[]);
    this.resetForm();  
  }
  resetForm(form?:NgForm){
    if(form != null)
      form.resetForm;
    this.serviceSearch.formData = {
 id:null
    };
  
  }
  openOrEdit(ID:number){
    this.router.navigate(['/facture/edit/' + ID]);

  }
 


    onSubmit(id : number){
     
      if (id != null) {
        
        this.service.getFactureByID(id).then(res => {
          this.service.formData = res.facture;
          this.service.factureDetails = res.factureDetails;
         });
         if(  this.service.formData != null ){
          this.router.navigate(['/facture/edit/' + id ]);
         
 }else 
 this.long ="Not Found!!"; 
 this.service.formData = null; 
     } }
  
   
  



}
