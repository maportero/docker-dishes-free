import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class RequestStoreService {
		
	public url: string;

	constructor(

		public _http: HttpClient

	){

		this.url = global.url;

	}



	getRequestStores( status ): Observable<any> {

		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
		
		let xPath = "";

		if (status === 'filter') xPath= 'requestStore';  else xPath = 'requestStore/all';

		//console.log(status);
        
		return this._http.get(this.url + xPath, {headers: headers});

	}




	processRequestStore(requestStore): Observable<any> {

			//let obj = {'amount': amount.toString()};
			let json = JSON.stringify(requestStore);
			let params ='json=' + json;
			//console.log(params);
			//console.log(order);

			let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
            //console.log(this.url);	
			return this._http.post(this.url +'requestStore/process', params, {headers: headers});
	}


} 