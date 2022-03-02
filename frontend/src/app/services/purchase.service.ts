import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class PurchaseService {
		
	public url: string;

	constructor(

		public _http: HttpClient

	){

		this.url = global.url;

	}



	getPurchases(): Observable<any> {

		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
		
		let xPath = "";


		//console.log(status);
        
		return this._http.get(this.url + 'purchases', {headers: headers});

	}




} 