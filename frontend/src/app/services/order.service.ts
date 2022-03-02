import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order} from '../models/order';
import { global } from './global';

@Injectable()
export class OrderService {
		public url: string;

	constructor(
		public _http: HttpClient

	){

		this.url = global.url;

	}

	create(order): Observable<any> {

			//let obj = {'amount': amount.toString()};
			let json = JSON.stringify(order)
			let params ='json=' + json;
			//console.log(params);
			//console.log(order);

			let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        //console.log(this.url);	
			return this._http.post(this.url+'order/store', params, {headers: headers});
	}

	getOrders( status ): Observable<any> {

		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
		
		let xPath = "";

		if (status === 'filter') xPath= 'orders';  else xPath = 'orders/all';

		//console.log(status);
        
		return this._http.get(this.url + xPath, {headers: headers});

	}

	getOrder(id): Observable<any> {

		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
									   								   
		return this._http.get(this.url+'order/detail/' + id, {headers: headers});

	}


	processOrder(order): Observable<any> {

			//let obj = {'amount': amount.toString()};
			let json = JSON.stringify(order)
			let params ='json=' + json;
			//console.log(params);
			//console.log(order);

			let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        //console.log(this.url);	
			return this._http.post(this.url+'order/process', params, {headers: headers});
	}


} 