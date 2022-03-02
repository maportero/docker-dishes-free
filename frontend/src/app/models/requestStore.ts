export class RequestStore {
	
	constructor (
		public id: number,
		public recipe_id: number,
		public order_ingredient_id: number,
		public amount: number,
		public status: string
	){}
}