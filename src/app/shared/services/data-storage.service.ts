import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from './recipe.service';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/recipe';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class DataStorageService {

	constructor(private http: Http,
	            private recipeService: RecipeService,
	            private authService: AuthService) {
	}

	saveRecipes() {
		const token = this.authService.getToken();
		return this.http.put('https://ng-recipe-book-fresh.firebaseio.com/recipes.json?auth=' + token,
			this.recipeService.getRecipes());
	}

	getRecipes(): void {
		const token = this.authService.getToken();

		this.http.get('https://ng-recipe-book-fresh.firebaseio.com/recipes.json?auth=' + token)
			.pipe(map(
				(response: Response) => {
					const recipes: Recipe[] = response.json();
					for (let recipe of recipes) {
						if (!recipe['ingredients']) {
							// console.log(recipe);
							recipe['ingredients'] = [];
						}
					}
					return recipes;
				}
			))
			.subscribe(
				(recipes: Recipe[]) => {
					// console.log(typeof recipes);
					this.recipeService.setRecipes(recipes);
				});
	}
}
