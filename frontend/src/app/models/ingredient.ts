export class Ingredient {
	
	constructor (
		public id: number,
		public name: string,
		public stock: number,
		public stockMin: number,
		public stockReserved: number,
	){}
}