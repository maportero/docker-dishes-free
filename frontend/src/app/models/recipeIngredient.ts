export class RecipeIngredient {
	
	constructor (
		public id: number,
		public recipe_id: number,
		public ingredient_id: number,
		public amount: number,
	){}
}