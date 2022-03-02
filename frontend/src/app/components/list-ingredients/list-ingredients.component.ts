import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { IngredientService } from '../../services/ingredient.service';


import { global } from '../../services/global';

@Component({
  selector: 'app-list-ingredients',
  templateUrl: './list-ingredients.component.html',
  styleUrls: ['./list-ingredients.component.css'],
  providers: [IngredientService]
})
export class ListIngredientsComponent implements OnInit {

  public page_title;
  public ingredients;
  public role;
  public status;
  public p: number;
  public display: string = "";
  public pageSize: number;
  public totalRows: number;
  public errors: any[];

  constructor(

      private _ingredientService: IngredientService,
      private _router: Router,
      private _route: ActivatedRoute,

    ) { 
    
    
    this.role = {name:""};
    this.loadRole();
    this.getIngredients();
    this.page_title ='Inventario de ingredientes';
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


  getIngredients(){

        this._ingredientService.getIngredients().subscribe(
             response => {
                
               
                   if (response.status == 'success'){
                    //console.log(response.ingredients)
                     this.ingredients = response.ingredients;
                     this.totalRows = this.ingredients.length;
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
