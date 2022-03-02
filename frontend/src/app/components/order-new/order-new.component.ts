import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { OrderService } from '../../services/order.service';


import { Order } from '../../models/order';


@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.css'],
  providers: [OrderService]
})
export class OrderNewComponent implements OnInit {

  public page_title: string;
  public errors: any[];
  public status: string = "";
  public display: string = "";
  public order;

  constructor(
       
       private _router: Router,
       private _route: ActivatedRoute,
      private _orderService: OrderService,


    ) { 

      this.page_title = "Generación de Platos";
      this.order = new Order(1,1,1,'Orden nueva');
      

  }

  ngOnInit(): void {
        
  }

  

  onSubmit(form){
       

       this._orderService.create(this.order).subscribe(
           response => {
             
             //console.log(response);
             this.status = response.status;
             if (response.status == 'success'){
                  form.reset();
                  this.errors = null;
             }

           },
           error => {
                this.status = 'error';
                this.errors = error.error.errors;
                console.log(<any>error);
           }

      );

  }


}
