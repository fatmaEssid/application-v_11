import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FactureDetail } from 'src/app/shared/facture-detail.model';
import { ContratService } from 'src/app/shared/contrat.service';
import { Contrat } from 'src/app/shared/contrat.model';
import { NgForm } from '@angular/forms';
import { FactureService } from 'src/app/shared/facture.service';

@Component({
  selector: 'app-facture-details',
  templateUrl: './facture-details.component.html',
  styles: []
})
export class FactureDetailsComponent implements OnInit {
formData : FactureDetail;
contratList :Contrat[];
isValid : boolean = true;
mindate: Date;
maxDate: Date;
d: Date =new Date;
lastDay :Date;
n:number=this.factureService.factureDetails.length;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data ,
    public dialogRef: MatDialogRef<FactureDetailsComponent>,
    
    private factureService:FactureService) { }

  ngOnInit() {
    
    let d = new Date();
    if(this.data.factDetailIndex == null){
    this.formData = {
     fact_detail_id : null,
         num_fact: (d.getMonth()+1).toString()+'.'+(d.getFullYear()).toString().substring(2)+'/00'+(this.n+1).toString(),
        fact_id :this.data.fact_id, 
   quantite:0,
         date_envoie:null, 
       total_ht:0,
     total_ttc :0,
      ref_fact :parseInt((d.getFullYear()).toString()+'0'+(this.n+1).toString()),
        montant_tva:0,
    }
  }else 
  this.formData =Object.assign({},this.factureService.factureDetails[this.data.factDetailIndex]) ;
  this.minDate();
 }

minDate(){
  if(this.factureService.factureDetails.length == 0)
  this.mindate= new Date(this.factureService.formData.date_debut_c);
  else{
  this.mindate= new Date(this.factureService.factureDetails[this.factureService.factureDetails.length-1].date_envoie); 
this.mindate=new Date(this.mindate.setDate(this.mindate.getDate()+1));}
  //.setDate(this.factureService.factureDetails[this.factureService.factureDetails.length-1].date_envoie.getDate()+1))

  this.maxDate= new Date(this.factureService.formData.date_fin_c);
  //this.lastDay = new Date(this.d.getFullYear(), this.d.getMonth() + 1, 0);
}

/*updatePrice(ctrl) {
    if(ctrl.selectedIndex == 0){
      this.formData.pri =0;
      this.formData.Description='';

    }
    else {
      this.formData.Price = this.contratList[ctrl.selectedIndex-1].Price;
      this.formData.Description = this.contratList[ctrl.selectedIndex-1].Description;
    }
    this.updateTotal();
}*/
  updateTotal(){
    this.formData.total_ht=parseFloat((this.formData.quantite * this.factureService.formData.price).toFixed(2)) ;
    this.formData.montant_tva=  this.formData.total_ht * this.factureService.formData.tva*0.1;
    this.formData.total_ttc=parseFloat((this.formData.total_ht +this.formData.montant_tva).toFixed(2)) ; }
    
  onSubmit(form:NgForm){
    if(this.validateForm(form.value)){
      if(this.data.factDetailIndex == null)
    this.factureService.factureDetails.push(form.value);
    else
    this.factureService.factureDetails[this.data.factDetailIndex]= form.value;
    this.dialogRef.close();
    
  }

  }
  validateForm(formData:FactureDetail){
    this.isValid =true ;
    
    if(formData.quantite==0)
     this.isValid=false;
    return this.isValid;
  }
  

}
