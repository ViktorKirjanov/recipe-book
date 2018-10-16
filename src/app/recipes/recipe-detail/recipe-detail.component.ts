import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe';
import { ShoppingListService } from '../../shared/services/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../../shared/services/recipe.service';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	private id: number;
	private recipe: Recipe;

	constructor(private shoppingListService: ShoppingListService,
	            private route: ActivatedRoute,
	            private router: Router,
	            private recipeService: RecipeService) {
	}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.recipe = this.recipeService.getRecipeById(this.id);
			}
		);
	}

	onAddToShoppingList(): void {
		this.shoppingListService.addIngredients(this.recipe.ingredients);
	}

	onEditRecipe(): void {
		this.router.navigate((['edit']), {relativeTo: this.route});
		// this.router.navigate((['../', this.id, 'edit']), {relativeTo: this.route});
	}

	onDeleteRecipe(): void {
		this.recipeService.deleteRecipe(this.id);
		this.router.navigate(['/recipes']);
	}
}
