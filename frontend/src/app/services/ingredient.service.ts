import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class IngredientService {
		
	public url: string;

	constructor(

		public _http: HttpClient

	){

		this.url = global.url;

	}



	getIngredients(): Observable<any> {

		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
		
		return this._http.get(this.url + 'ingredients', {headers: headers});

	}



} 