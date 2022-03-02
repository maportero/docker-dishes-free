export class Order {
	
	constructor (
		public id: number,
		public recipe_id: number,
		public amount: number,
		public status: string
	){}
}