import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../shared/models/recipe';

@Component({
	selector: 'app-recipe-item',
	templateUrl: './recipe-item.component.html',
	styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
	@Input() index: number;
	@Input() recipe: Recipe;

	constructor() {
	}

	ngOnInit() {
	}



}
