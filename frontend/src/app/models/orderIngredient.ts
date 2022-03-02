export class OrderIngredient {
	
	constructor (
		public id: number,
		public order_id: number,
		public ingredient_id: number,
		public amountNeeded: number,
		public amountAvailable: number,
	){}
}