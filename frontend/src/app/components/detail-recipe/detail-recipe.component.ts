import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { Order } from '../../models/order';

import { global } from '../../services/global';
@Component({
  selector: 'app-detail-recipe',
  templateUrl: './detail-recipe.component.html',
  styleUrls: ['./detail-recipe.component.css'],
  providers: [RecipeService]
})
export class DetailRecipeComponent implements OnInit {


  public page_title;
  public recipe;
  public ingredients;
  public role;
  public status;
  public p: number;
  public display: string = "";
  public pageSize: number;
  public totalRows: number;
  public errors: any[];

  constructor(

      private _recipeService: RecipeService,
      private _router: Router,
      private _route: ActivatedRoute,

    ) { 
    
    
    this.role = {name:""};
    this.loadRole();
    this.getRecipe();
    this.page_title ='Detalle de la receta';
    this.p = 1;
    this.pageSize=5;
    this.recipe = new Recipe(1,'');

  }

  ngOnInit(): void {

    this.loadRole();

  }
  
  loadRole(){
     
     this.role.name = localStorage.getItem('role');

  }



  getRecipe(){
        

        this._route.params.subscribe(params => {
             let id = params['id'];
             this._recipeService.getDetailRecipe(id).subscribe(
             response => {
                  
                   if (response.status == 'success'){
                     this.recipe = response.recipe;
                     this.ingredients = response.recipe.details;
                     this.totalRows = this.ingredients.length;
                     console.log(this.ingredients);
                     console.log(this.recipe);
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
