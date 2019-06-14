import { Injectable } from '@angular/core';
import { Facture } from './facture.model';
import { FactureDetail } from './facture-detail.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/*  formData: Order;
  orderItems: OrderItem[];

  constructor(private http: HttpClient) { }

  saveOrUpdateOrder() {
    var body = {
      ...this.formData,
      OrderItems: this.orderItems
    };
    return this.http.post(environment.apiURL + '/Order', body);
  }*/

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  formData : Facture;
  factureDetails : FactureDetail[];

  constructor(private http : HttpClient) { }

// Submitted Method♦
  saveFacture(){
    var body = {
      ...this.formData,
      Facture_details : this.factureDetails
    };
   return this.http.post(environment.apiURL+'/Facture', body);
  }
//Modify Method
updateFacture(){
  var body = {
    ...this.formData,
    Facture_details : this.factureDetails

  };
return this.http.post(environment.apiURL+'/Facture/', body);
}
  //Getting List♣
  getFactureList() {
    return this.http.get(environment.apiURL+'/Facture').toPromise();
   }
   
 getFactureByID(id:number):any {
    return this.http.get(environment.apiURL + '/Facture/'+id).toPromise();
  }

}
