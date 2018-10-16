import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../auth/auth-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations:[
		HeaderComponent,
		HomeComponent
	],
	imports:[
		CommonModule,
		AppRoutingModule
	],
	exports:[
		AppRoutingModule,
		HeaderComponent
	]
})
export class CoreModule{

}