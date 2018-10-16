import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { DataStorageService } from '../../shared/services/data-storage.service';
import { AuthService } from '../../shared/services/auth.service';



@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(private dataStorage: DataStorageService,
	            private authService: AuthService,
	            private router: Router) { }

	ngOnInit() { }

	onGetData() {
		this.dataStorage.getRecipes();
	}

	onSaveData() {
		this.dataStorage.saveRecipes()
			.subscribe(
				(response: Response) => {
					console.log(response);
				});
	}

	onLogOut(){
		this.authService.logOut();
		this.router.navigate(['/']);
	}

}
