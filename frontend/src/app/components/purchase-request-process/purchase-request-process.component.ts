import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { PurchaseRequestService } from '../../services/purchaseRequest.service';


import { global } from '../../services/global';

@Component({
  selector: 'app-purchase-request-process',
  templateUrl: './purchase-request-process.component.html',
  styleUrls: ['./purchase-request-process.component.css'],
  providers: [PurchaseRequestService]
})
export class PurchaseRequestProcessComponent implements OnInit {

  public page_title;
  public purchaseRequests;
  public role;
  public status;
  public p: number;
  public display: string = "";
  public pageSize: number;
  public totalRows: number;
  public errors: any[];
  public colorStatus;

  constructor(

      private _purchaseRequestService: PurchaseRequestService,
      private _router: Router,
      private _route: ActivatedRoute,

    ) { 
    
    this.colorStatus = global.colorStatusPurchaseRequest;
    this.role = {name:""};
    this.loadRole();
    this.getPurchaseRequests();
    this.page_title ='Procesamiento de solicitudes de Compras';
    this.p = 1;
    this.pageSize=5;
   
    //console.log(this.colorStatus['Enviado a compra']);

  }

  ngOnInit(): void {

    this.loadRole();


  }
  
  loadRole(){
     
     this.role.name = localStorage.getItem('role');
     //console.log(this.role.name);

  }

  processPurchaseRequest(purchaseRequest){
    //console.log(PurchaseRequest);

      this._purchaseRequestService.processPurchaseRequest(purchaseRequest).subscribe(
           response => {
             
             //console.log(response);
             this.status = response.status;
             if (response.status == 'success'){
                  //form.reset();
                  //this.errors = null;
                  this.sendGetPurchaseRequests('filter')

             }

           },
           error => {
                this.status = 'error';
                this.errors = error.error.errors;
                console.log(<any>error);
           }
      );

  }


  getPurchaseRequests(){

        this._route.params.subscribe(params => {
          let xStatus = params['status'];
             //console.log(xStatus);
            this.sendGetPurchaseRequests(xStatus)

        });

   }

  sendGetPurchaseRequests(xStatus) {
             //console.log(xStatus);
             this._purchaseRequestService.getPurchaseRequests(xStatus).subscribe(
             response => {
                
               
                   if (response.status == 'success'){
                     this.purchaseRequests = response.purchaseRequests;
                     this.totalRows = this.purchaseRequests.length;
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