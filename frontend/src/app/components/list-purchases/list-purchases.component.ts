import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { PurchaseService } from '../../services/purchase.service';


import { global } from '../../services/global';

@Component({
  selector: 'app-list-purchases',
  templateUrl: './list-purchases.component.html',
  styleUrls: ['./list-purchases.component.css'],
  providers: [PurchaseService]
})
export class ListPurchasesComponent implements OnInit {


  public page_title;
  public purchases;
  public role;
  public status;
  public p: number;
  public display: string = "";
  public pageSize: number;
  public totalRows: number;
  public errors: any[];
  public colorStatus;

  constructor(

      private _purchaseService: PurchaseService,
      private _router: Router,
      private _route: ActivatedRoute,

    ) { 
    
    this.colorStatus = global.colorStatusPurchase;
    this.role = {name:""};
    this.loadRole();
    this.getPurchases();
    this.page_title ='Historial de Compras en el MARKET PLACE';
    this.p = 1;
    this.pageSize=5;

  }

  ngOnInit(): void {

    this.loadRole();

  }
  
  loadRole(){
     
     this.role.name = localStorage.getItem('role');
     //console.log(this.role.name);

  }




  getPurchases(){

      this._purchaseService.getPurchases().subscribe(
             response => {
                
               
                   if (response.status == 'success'){
                     this.purchases = response.purchases;
                     this.totalRows = this.purchases.length;
                    // console.log(this.orders);
                   }

             },
             error => {
                  this.status = 'error';
                  console.log(<any>error);
             }

        );

   }


}
