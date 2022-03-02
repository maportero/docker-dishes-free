export class Purchase {
	
	constructor (
		public id: number,
		public ingredient_id: number,
		public amount: number,
		public status: string
	){}
}