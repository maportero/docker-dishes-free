import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { RequestStoreService } from '../../services/requestStore.service';


import { global } from '../../services/global';

@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.css'],
  providers: [RequestStoreService]
})
export class ListRequestsComponent implements OnInit {

  public page_title;
  public requestStores;
  public role;
  public status;
  public p: number;
  public display: string = "";
  public pageSize: number;
  public totalRows: number;
  public errors: any[];
  public colorStatus;

  constructor(

      private _requestStoreService: RequestStoreService,
      private _router: Router,
      private _route: ActivatedRoute,

    ) { 
    
    this.colorStatus = global.colorStatusOrderStore;
    this.role = {name:""};
    this.loadRole();
    this.getRequestStores();
    this.page_title ='Historial de solicitudes de ingredientes';
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




  getRequestStores(){

        this._route.params.subscribe(params => {
          let xStatus = params['status'];
             //console.log(xStatus);
            this.sendGetRequestStores(xStatus)

        });

   }

  sendGetRequestStores(xStatus) {
             this._requestStoreService.getRequestStores(xStatus).subscribe(
             response => {
                
               
                   if (response.status == 'success'){
                     this.requestStores = response.requestStores;
                     this.totalRows = this.requestStores.length;
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
