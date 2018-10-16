import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe';
import { RecipeService } from '../../shared/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/index';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
	recipes: Recipe[];
	private subscription: Subscription;

	constructor(private recipeService: RecipeService,
	            private router: Router,
	            private route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.recipes = this.recipeService.getRecipes();
		this.subscription = this.recipeService.recipeChanged.subscribe(
			(recipes: Recipe[]) => {
				this.recipes = recipes;
			}
		);
	}

	onNewRecipe(): void {
		this.router.navigate(['new'], {relativeTo: this.route});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
