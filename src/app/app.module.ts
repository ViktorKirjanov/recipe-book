import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		CoreModule,
		BrowserModule,
		HttpModule,
		ShoppingListModule,
		AuthModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
