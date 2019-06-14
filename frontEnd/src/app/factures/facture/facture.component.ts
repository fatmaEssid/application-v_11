import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FactureService } from 'src/app/shared/facture.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FactureDetailsComponent } from '../facture-details/facture-details.component';
import { ClientService } from 'src/app/shared/client.service';
import { Client } from 'src/app/shared/client.model';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { ContratService } from 'src/app/shared/contrat.service';
import { Contrat } from 'src/app/shared/contrat.model';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Facture } from 'src/app/shared/facture.model';
/*import * as jsPDF from 'jspdf';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
import * as html2pdf from 'html2pdf.js';*/

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls:['./facture.component.scss'],
  animations: [routerTransition()]
})
export class FactureComponent implements OnInit {


  /* download() {   
   var data = document.getElementById('fatoura'); 
    html2canvas(data).then(function(canvas) {
      var imgWidth = 208;   
      var pageHeight = 295;    
    var imgHeight = canvas.height * imgWidth / canvas.width; 
    var heightLeft = imgHeight; 
    
    var img = canvas.toDataURL("image/png");
    var doc = new jsPDF('p', 'mm', 'a4');
    var position = 0; 
    doc.addImage(img,'JPEG', 0, position, imgWidth, imgHeight);
    doc.save('testCanvas.pdf');
    });


}*/


 // netImage: any ="../../assets/logoFacture.png";
 factureList;
  clientList:Client[];
  isValid : boolean = true;
   n :number = 0;
   bsValue = new Date();
   REF : string;
   REFF:number;
   MAIL:string;
   DATE :Date;
   NUM :string;
       TOTAL:number;
        QTE:number;
        MTVA:number;
      TTTC:number;
  constructor(private service:FactureService, private dialog:MatDialog,
    private clientService:ClientService, private contratService:ContratService,  public snackBar: MatSnackBar, private router:Router,private currentRouter:ActivatedRoute) { }
ID : string=null;
  ngOnInit() {
    this.contratService.refreshList();
    this.clientService.getClientList().then(res=> this.clientList = res as Client[]);
    /*this.service.getFactureList().then(res=>this.factureList = res);
    this.resetForm();*/

      let fact_id = this.currentRouter.snapshot.paramMap.get('id');
      this.ID=fact_id;
   if (fact_id == null)
      this.resetForm();
    else {
      this.service.getFactureByID(parseInt(fact_id)).then(res => {
        this.service.formData = res.facture;
        this.service.factureDetails = res.factureDetails;
        this.MAIL=res.facture.mail;
        this.REF=res.facture.ref_contr;
        this.service.formData.ref_contrat=res.facture.ref_contr;
       });
        }
    
    
  }//for enable and disable
  state()
  {  
    return this.ID != null;
   
  }/*  let orderID = this.currentRoute.snapshot.paramMap.get('id');
    if (orderID == null)
      this.resetForm();
    else {
      this.service.getOrderByID(parseInt(orderID)).then(res => {
        this.service.formData = res.order;
        this.service.orderItems = res.orderDetails;
      });
    }

    this.customerService.getCustomerList().then(res => this.customerList = res as Customer[]);*/
  
  
  resetForm(form?:NgForm){
 
    let d = new Date();

    if(form = null)
    this.resetForm(form);
    this.service.formData = {
      fact_id :null,
  client :'',
contrat_id : 0,
 grand_total : 0,
 label : '',
 price : 0,
 tva : 0,
 local: '',
 ref_contrat: '',
 date_debut_c:null,
 date_fin_c:null
 //DeletedDetailFactIDs:''
     /* fact_id :null,
      ref_fact :parseInt((new Date().getFullYear()).toString()+'0'+(this.n+1).toString()),
      mois: d,// toDate((d.getMonth() +1 +'/'+d.getFullYear())),
      client:'',
      date_envoie:d,//Date.parse((d.getDate()).toString() +'/'+(d.getMonth()+1)+'/'+d.getFullYear),
      contrat_id:0,
      ref_contrat:''*/
    };
    this.service.factureDetails=[];
  }
  
  changeClient(ctrl){
    if (ctrl.selectedIndex==0) {
      this.service.formData.client ='';
      this.service.formData.label='';
      this.service.formData.price=0;
      this.service.formData.tva=0;
      this.service.formData.local='';
      this.service.factureDetails=[];
    }
    else{
    this.service.formData.client = this.contratService.list[ctrl.selectedIndex-1].client_nom.toLocaleUpperCase();
    this.service.formData.label= this.contratService.list[ctrl.selectedIndex-1].description;
    this.service.formData.price=  this.contratService.list[ctrl.selectedIndex-1].prix_unitaire;
    this.service.formData.date_debut_c=  this.contratService.list[ctrl.selectedIndex-1].date_debut;
    this.service.formData.date_fin_c=  this.contratService.list[ctrl.selectedIndex-1].date_fin;
this.REF=this.contratService.list[ctrl.selectedIndex-1].ref_contrat;

    let i=0;
    while (i<this.clientList.length && this.contratService.list[ctrl.selectedIndex-1].client_id != this.clientList[i].client_id) {
      i++;
    }
   if (i<this.clientList.length) {
      this.service.formData.tva=this.clientList[i].client_TVA;
      this.service.formData.local=this.clientList[i].client_adresse;
      this.MAIL =this.clientList[i].client_email;
   }
  }  
  }

  
  
  addOrEditFactDetail(factDetailIndex, fact_id){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose =true ;
    dialogConfig.width="50%";
    dialogConfig.data = {factDetailIndex,fact_id};
    this.dialog.open(FactureDetailsComponent, dialogConfig).afterClosed().subscribe(res=>{
      this.UpdateGrandTotale();
    });

  }

/*  onDeleteFactDetail(fact_detail_id :number, i: number){
    if (fact_detail_id != null)
    this.service.formData.DeletedDetailFactIDs += fact_detail_id + ",";
    this.service.factureDetails.splice(i,1);
    this.UpdateGrandTotale();
  }**/
  UpdateGrandTotale(){
    this.service.formData.grand_total = parseFloat((this.service.factureDetails.reduce((prev, curr)=> {
      return prev + curr.total_ttc;
    },0)).toFixed(2));
    this.service.formData.grand_total=parseFloat((this.service.formData.grand_total).toFixed(2)) ;
  }
  validateForm(){
    this.isValid=true;
    if(this.service.formData.contrat_id == 0)
    this.isValid=false;
  // else if(this.service.factureDetails.length == 0)
    //this.isValid=false;
    return this.isValid;
  }
  /*onSubmit(form: NgForm){
    if(this.validateForm()){
      this.service.saveOrUpdateOrder().subscribe(res=> {
        this.resetForm();
        this.toastr.success('Bien Enregistrée', 'FACTURE');
        this.router.navigate(['/factures']);
      })
    }
  }*/
 onSubmit(form: NgForm) {
    if( this.service.formData.fact_id == null){
      this.service.saveFacture().subscribe(res => {
        this.resetForm();
        this.openSnackBar('FACTURE', 'Submitted Successfully');
        this.router.navigate(['/factures']);
      })
    }  
    else {
      this.service.updateFacture().subscribe(res => {
        this.resetForm();
        this.openSnackBar('FACTURE', 'modify Successfully');
        this.router.navigate(['/factures']);
      })
    }
  }
/*
 onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.service.saveOrUpdateFacture().subscribe(res => {
        this.resetForm();
        this.openSnackBar('FACTURE', 'Submitted Successfully');
        this.router.navigate(['/factures']);
      })
    }
  }*/
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 4000,
       verticalPosition: 'bottom',
      
    
    });
 }
 transfer(i: number, id:number){
  this.service.getFactureByID((id)).then(res => {
    
    this.DATE = res.factureDetails[i].date_envoie;
    this.REFF =res.factureDetails[i].ref_fact;
    this.TOTAL= res.factureDetails[i].total_ht;
    this.TTTC = res.factureDetails[i].total_ttc;
    this.QTE = res.factureDetails[i].quantite;
    this.NUM = res.factureDetails[i].num_fact;
    this.MTVA =res.factureDetails[i].montant_tva;
  
  });
 }
 vider(){
   this.service.formData = null;
 }
 
//👮 👩‍🎓 🐊 🔥👨‍🎤🏋 🤓 🏆 🤹👮👩‍🎓🐊🔥👨‍🎤🏋 Download or convert HTML 2 PDF file 👮 👩‍🎓 🐊 🔥👨‍🎤🏋 🤓 🏆 🤹👮👩‍🎓🐊🔥👨‍🎤🏋
 /*downloadPDF(){
  html2canvas(document.getElementById('contentToConvert')).then(function(canvas) {
  var img = canvas.toDataURL("image/png");
  var doc = new jsPDF();
  doc.addImage(img,'JPEG',5,20);
  doc.save('testCanvas.pdf');
  });
 }*/
/*public captureScreen(){  
  html2canvas(document.getElementById('contentToConvert')).then(function(canvas) {
    var img = canvas.toDataURL("image/png");
    var doc = new jsPDF();
    doc.addImage(img,'JPEG',5,20);
    doc.save('Facture.pdf');
  });

/*var data = document.getElementById('contentToConvert');  
   html2canvas(data).then(canvas => {  
     // Few necessary setting options  
     var imgWidth = 208;   
     var pageHeight = 295;    
     var imgHeight = canvas.height * imgWidth / canvas.width;  
     var heightLeft = imgHeight;  
 
     const contentDataURL = canvas.toDataURL('image/png')  ;
     let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
     var position = 0;  
     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
     pdf.save('MYPdf.pdf'); // Generated PDF   
   });
 }  */


/*public downloadPDF() {
  html2canvas(document.getElementById('content')).then(function(canvas) {
    var img = canvas.toDataURL("image/png");
    var doc = new jsPDF();
    doc.addImage(img,'JPEG',5,20);
    doc.save('Facture.pdf');
  });
}*/

}//fin de la classe FactureComponent 
