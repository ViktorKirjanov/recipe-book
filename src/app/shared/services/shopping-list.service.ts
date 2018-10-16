import { Ingredient } from '../models/ingredient';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ShoppingListService {
	ingredientChanged = new Subject<Ingredient[]>();
	startedEditing = new Subject<number>();

	private ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 7),
	];

	constructor() {
	}

	getIngredients(): Ingredient[] {
		return this.ingredients.slice();
	}

	addIngredient(ingredient: Ingredient): void {
		this.ingredients.push(ingredient);
		this.ingredientChanged.next(this.ingredients.slice());
	}

	addIngredients(ingredients: Ingredient[]): void {
		// v1:simple
		this.ingredients.push(...ingredients);
		this.ingredientChanged.next(this.ingredients.slice());

		// v2, find the same ingredient
		// for (let ingredient of ingredients) {
		// 	let temp: Ingredient = this.ingredients.find(x => x.name === ingredient.name);
		// 	if (temp == null)
		// 		this.ingredients.push(ingredient);
		// 	else
		// 		temp.amount += ingredient.amount;
		// }

	}

	getIngredient(index: number): Ingredient {
		return this.ingredients[index];
	}


	updateIngredient(index: number, newIngredient: Ingredient) {
		this.ingredients[index] = newIngredient;
		this.ingredientChanged.next(this.ingredients.slice());
	}

	deleteIngredient(index: number): void {
		this.ingredients.splice(index, 1);
		this.ingredientChanged.next(this.ingredients.slice());

	}

}
