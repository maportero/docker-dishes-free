import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { OrderService } from '../../services/order.service';


import { Order } from '../../models/order';
import { global } from '../../services/global';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [OrderService]
})
export class OrderListComponent implements OnInit {

  public page_title;
  public orders;
  public role;
  public status;
  public p: number;
  public pageSize: number;
  public totalRows: number;
  public colorStatus;

  constructor(

      private _orderService: OrderService,
      private _router: Router,
      private _route: ActivatedRoute,

    ) { 
    
    
    this.role = {name:""};
    this.loadRole();
    this.getOrders();
    this.page_title ='Lista de solicitudes de ordenes';
    this.p = 1;
    this.pageSize=5;
    this.colorStatus = global.colorStatusOrderText;
    //console.log(colorstatus['Ingredientes solicitados']);

  }

  ngOnInit(): void {

    this.loadRole();

  }
  
  loadRole(){
     
     this.role.name = localStorage.getItem('role');
     //console.log(this.role.name);

  }

  getOrders(){

        this._route.params.subscribe(params => {
          let xStatus = params['status'];
             //console.log(xStatus);
             this._orderService.getOrders(xStatus).subscribe(
             response => {
                
               
                   if (response.status == 'success'){
                     this.orders = response.orders;
                     this.totalRows = this.orders.length;
                    // console.log(this.orders);
                   }

             },
             error => {
                  this.status = 'error';
                  console.log(<any>error);
             }

           ); 

        });
         

  }

}
