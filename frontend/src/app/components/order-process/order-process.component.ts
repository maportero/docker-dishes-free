import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { OrderService } from '../../services/order.service';


import { Order } from '../../models/order';
import { global } from '../../services/global';


@Component({
  selector: 'app-order-process',
  templateUrl: './order-process.component.html',
  styleUrls: ['./order-process.component.css'],
  providers: [OrderService]
})
export class OrderProcessComponent implements OnInit {

  public page_title;
  public order;
  public ingredients;
  public role;
  public status;
  public p: number;
  public display: string = "";
  public pageSize: number;
  public totalRows: number;
  public errors: any[];
  public colorStatus;

  constructor(

      private _orderService: OrderService,
      private _router: Router,
      private _route: ActivatedRoute,

    ) { 
    
    
    this.role = {name:""};
    this.loadRole();
    this.getOrder();
    this.page_title ='Procesamiento de la orden';
    this.p = 1;
    this.pageSize=5;
    this.colorStatus = global.colorStatusOrder;
    

  }

  ngOnInit(): void {

    this.loadRole();

  }
  
  loadRole(){
     
     this.role.name = localStorage.getItem('role');
     //console.log(this.role.name);

  }

  onSubmit(form){

      this._orderService.processOrder(this.order).subscribe(
           response => {
             
             //console.log(response);
             this.status = response.status;
             if (response.status == 'success'){
                  //form.reset();
                  //this.errors = null;
                  this.sendGetOrder(this.order.id);

             }

           },
           error => {
                this.status = 'error';
                this.errors = error.error.errors;
                console.log(<any>error);
           }
      );

  }

  getOrder(){
        

        this._route.params.subscribe(params => {
          let id = params['id'];
             //console.log(id);
            this.sendGetOrder(id);

        });
         

  }


  sendGetOrder(id){

    this._orderService.getOrder(id).subscribe(
             response => {
                
               
                   if (response.status == 'success'){
                     this.order = response.order[0];
                     this.ingredients = response.details;
                     this.totalRows = this.ingredients.length;
                     ///console.log('sendGetOrder(id)');
                     //console.log(this.order);
                     //console.log(this.ingredients);
                   }

             },
             error => {
                  this.status = 'error';
                  console.log(<any>error);
             }

       ); 

  }


}
