import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class PurchaseRequestService {
		
	public url: string;

	constructor(

		public _http: HttpClient

	){

		this.url = global.url;

	}



	getPurchaseRequests( status ): Observable<any> {

		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
		
		let xPath = "";

		if (status === 'filter') xPath= 'purchaseRequests';  else xPath = 'purchaseRequest/all';

		//console.log(status);
        
		return this._http.get(this.url + xPath, {headers: headers});

	}




	processPurchaseRequest(purchaseRequest): Observable<any> {

			//let obj = {'amount': amount.toString()};
			let json = JSON.stringify(purchaseRequest);
			let params ='json=' + json;
			//console.log(params);
			//console.log(order);

			let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
            //console.log(this.url);	
			return this._http.post(this.url +'purchaseRequest/process', params, {headers: headers});
	}


} 