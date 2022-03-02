import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class RecipeService {
        
    public url: string;

    constructor(

        public _http: HttpClient

    ){

        this.url = global.url;

    }



    getRecipes(): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        
        return this._http.get(this.url + 'recipes', {headers: headers});

    }

    getDetailRecipe(id): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        
        return this._http.get(this.url + 'recipe/detailRecipe/' + id, {headers: headers});

    }

} 