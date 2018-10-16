import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/models/ingredient';
import {ShoppingListService} from '../shared/services/shopping-list.service';
import {Subscription} from 'rxjs/index';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
	ingredients: Ingredient[];
	private subscription: Subscription;

	constructor(private shoppingListService: ShoppingListService) {
	}

	ngOnInit() {
		this.ingredients = this.shoppingListService.getIngredients();
		this.subscription = this.shoppingListService.ingredientChanged
			.subscribe(
				(ingredients: Ingredient[]) => {
					this.ingredients = ingredients;
				}
			);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onAddAmount() {
		console.log('onAddAmount');
	}

	onEditItem(index: number) {
		this.shoppingListService.startedEditing.next(index);
	}

}