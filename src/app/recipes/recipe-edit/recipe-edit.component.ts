import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../shared/services/recipe.service';
import { Ingredient } from '../../shared/models/ingredient';
import { Recipe } from '../../shared/models/recipe';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
	id: number;
	editMode: boolean = false;
	recipeForm: FormGroup;

	constructor(private route: ActivatedRoute,
	            private recipeService: RecipeService,
	            private router: Router) {
	}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.id = +params['id'];
			this.editMode = params['id'] != null;
			console.log(this.editMode);
			this.initForm();
		});
	}

	private initForm() {
		const recipe = this.recipeService.getRecipeById(this.id);
		let recipeName: string = '';
		let recipeImagePath: string = '';
		let recipeDescription: string = '';
		let recipeIngredients = new FormArray([]);

		if (this.editMode) {
			recipeName = recipe.name;
			recipeImagePath = recipe.imagePath;
			recipeDescription = recipe.description;
			if (recipe['ingredients']) {
				for (let ingredient of recipe.ingredients) {
					recipeIngredients.push(
						new FormGroup({
							'name': new FormControl(ingredient.name, Validators.required),
							'amount': new FormControl(ingredient.amount, [
								Validators.required,
								Validators.pattern(/^[1-9]+[0-9]*$/)
							])
						})
					);
				}
			}
		}

		this.recipeForm = new FormGroup({
			'name': new FormControl(recipeName, Validators.required),
			'imagePath': new FormControl(recipeImagePath, Validators.required),
			'description': new FormControl(recipeDescription, Validators.required),
			'ingredients': recipeIngredients
		});
	}

	onAdIngredient() {
		(<FormArray>this.recipeForm.get('ingredients')).push(
			new FormGroup({
				'name': new FormControl(null, Validators.required),
				'amount': new FormControl(null, [
					Validators.required,
					Validators.pattern(/^[1-9]+[0-9]*$/)
				])
			})
		);
	}

	onSubmit() {
		console.log(this.recipeForm);
		// const recipe = new Recipe(
		// 	this.recipeForm.value['name'],
		// 	this.recipeForm.value['description'],
		// 	this.recipeForm.value['ingredients'],
		// 	this.recipeForm.value['imagePath'],
		// );
		if (this.editMode) {
			this.recipeService.updateRecipe(this.id, this.recipeForm.value);
		} else {
			this.recipeService.addRecipe(this.recipeForm.value);
		}
		this.onCancel();
	}

	onCancel() {
		this.router.navigate(['../'], {relativeTo: this.route});
	}

	onDeleteIngredient(index: number): void {
		(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
	}

}
