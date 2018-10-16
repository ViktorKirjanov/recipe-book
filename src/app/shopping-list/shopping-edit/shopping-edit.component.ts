import {
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild
} from '@angular/core';
import {Ingredient} from '../../shared/models/ingredient';
import {ShoppingListService} from '../../shared/services/shopping-list.service';
import {Subscription} from 'rxjs/index';
import {NgForm} from '@angular/forms';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
	// @ViewChild('inputName') nameInputRef: ElementRef;
	// @ViewChild('inputAmount') amountInputRef: ElementRef;
	@ViewChild('f') shoppingListForm: NgForm;
	subscription: Subscription;
	editMode = false;
	editedItemIndex: number;
	editedItem: Ingredient;


	constructor(private shoppingListService: ShoppingListService) {
	}

	ngOnInit(): void {
		this.subscription = this.shoppingListService.startedEditing.subscribe(
			(index: number) => {
				this.editMode = true;
				this.editedItemIndex = index;
				this.editedItem = this.shoppingListService.getIngredient(index);
				this.shoppingListForm.setValue({
					name: this.editedItem.name,
					amount: this.editedItem.amount
				});
			}
		);
	}


	// onAddItem() {
	// 	const newIngredient = new Ingredient(
	// 		this.nameInputRef.nativeElement.value,
	// 		this.amountInputRef.nativeElement.value
	// 	);
	// 	this.shoppingListService.addIngredient(newIngredient);
	// }

	onSubmit(form): void {
		const newIngredient = new Ingredient(
			form.value.name,
			form.value.amount
		);
		if (this.editMode) {
			this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
		} else {
			this.shoppingListService.addIngredient(newIngredient);
		}
		this.editMode = false;
		form.reset();

	}

	onClear(): void {
		this.shoppingListForm.reset();
		this.editMode = false;
	}

	onDelete(): void {
		this.shoppingListService.deleteIngredient(this.editedItemIndex);
		this.onClear();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
