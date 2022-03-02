export class PurchaseRequest {
	
	constructor (
		public id: number,
		public request_store_id: number,
		public ingredient_id: number,
		public amount: number,
		public amountPurchase: number,
		public status: string,
	){}
}