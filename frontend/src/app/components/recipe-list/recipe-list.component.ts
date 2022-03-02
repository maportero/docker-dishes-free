import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { RecipeService } from '../../services/recipe.service';


import { global } from '../../services/global';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: [RecipeService]
})
export class RecipeListComponent implements OnInit {


  public page_title;
  public recipes;
  public role;
  public status;
  public p: number;
  public pageSize: number;
  public totalRows: number;

  constructor(

      private _recipeService: RecipeService,
      private _router: Router,
      private _route: ActivatedRoute,

    ) { 
    
    
    this.role = {name:""};
    this.loadRole();
    this.getRecipes();
    this.page_title ='Lista de Recetas';
    this.p = 1;
    this.pageSize=5;

  }

  ngOnInit(): void {

    this.loadRole();

  }
  
  loadRole(){
     
     this.role.name = localStorage.getItem('role');

  }

  getRecipes(){

            
             this._recipeService.getRecipes().subscribe(
             response => {
                
                 
                   if (response.status == 'success'){
                     this.recipes = response.recipes;
                     this.totalRows = this.recipes.length;
                      console.log(this.recipes);
                   }

             },
             error => {
                  this.status = 'error';
                  console.log(<any>error);
             }

           ); 

  }

}
