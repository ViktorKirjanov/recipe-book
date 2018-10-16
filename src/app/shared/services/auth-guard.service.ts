import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/index';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

	constructor(private authService: AuthService,
	            private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.authService.isAuthenticated();
	}


	canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
		console.log("xxx");
		const isAuthenticated = this.authService.isAuthenticated();
		if (isAuthenticated) {
			return true;
		} else {
			this.router.navigate(['/']);
			return false;
		}
	}
}