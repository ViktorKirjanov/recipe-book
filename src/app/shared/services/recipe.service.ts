import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';
import { Subject } from 'rxjs/index';

@Injectable({
	providedIn: 'root'
})
export class RecipeService {
	recipeChanged = new Subject<Recipe[]>();

	private recipes: Recipe[] = [
		new Recipe(
			'Ultimate chorizo ciabatta',
			'Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque',
			[
				new Ingredient('Meat', 2),
				new Ingredient('Tomatoes', 5)
			],
			'https://picsum.photos/600/300?image=1',
		)
	];

	constructor() {
	}

	getRecipes(): Recipe[] {
		return this.recipes.slice();
	}

	getRecipeById(index: number): Recipe {
		return this.recipes.slice()[index];
	}

	addRecipe(recipe: Recipe): void {
		this.recipes.push(recipe);
		this.recipeChanged.next(this.recipes.slice());
	}

	updateRecipe(index: number, recipe: Recipe): void {
		this.recipes[index] = recipe;
		this.recipeChanged.next(this.recipes.slice());
	}

	deleteRecipe(index: number): void {
		this.recipes.splice(index, 1);
		this.recipeChanged.next(this.recipes.slice());
	}

	setRecipes(recipes: Recipe[]) {
		console.log(recipes);
		this.recipes = recipes;
		this.recipeChanged.next(this.recipes.slice());
	}
}
