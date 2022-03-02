import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { RequestStoreService } from '../../services/requestStore.service';


import { global } from '../../services/global';

@Component({
  selector: 'app-request-process',
  templateUrl: './request-process.component.html',
  styleUrls: ['./request-process.component.css'],
  providers: [RequestStoreService]
})
export class RequestProcessComponent implements OnInit {

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
    
    
    this.role = {name:""};
    this.loadRole();
    this.getRequestStores();
    this.page_title ='Procesamiento de solicitudes de ingredientes';
    this.p = 1;
    this.pageSize=5;
    this.colorStatus = global.colorStatusOrderStore;

  }

  ngOnInit(): void {

    this.loadRole();

  }
  
  loadRole(){
     
     this.role.name = localStorage.getItem('role');
     //console.log(this.role.name);

  }

  processRequestStore(requestStore){
    //console.log(requestStore);

      this._requestStoreService.processRequestStore(requestStore).subscribe(
           response => {
             
             //console.log(response);
             this.status = response.status;
             if (response.status == 'success'){
                  //form.reset();
                  //this.errors = null;
                  this.sendGetRequestStores('filter');


             }

           },
           error => {
                this.status = 'error';
                this.errors = error.error.errors;
                console.log(<any>error);
           }
      );

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
                    //console.log('sendGetRequestStores(xStatus)');
                    //console.log(this.requestStores);
                   }

             },
             error => {
                  this.status = 'error';
                  console.log(<any>error);
             }

           ); 
  }

}