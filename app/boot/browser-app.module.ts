import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import * as config from 'config/global';

/**
 * Entry module for browser side
 */
@NgModule(
{
	bootstrap: [AppComponent],
	imports:
	[
		AppModule,
		BrowserAnimationsModule
	]
})
export class BrowserAppModule
{
	//######################### public properties #########################
    
    /**
     * Method called when application is stable 
     */
	public ngOnBootstrap = () =>
	{
	}

	//######################### constructor #########################
	constructor()
	{
	}
}
