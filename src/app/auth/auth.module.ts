import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './auth-routing.module';

@NgModule({
	declarations: [
		SigninComponent,
		SignupComponent
	],
	imports: [
		FormsModule,
		AppRoutingModule
	]
})
export class AuthModule {}