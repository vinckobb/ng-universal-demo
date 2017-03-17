import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppModule} from './app.module';

@NgModule(
{
	bootstrap: [AppComponent],
	imports: [AppModule]
})
export class BrowserAppModule
{
}
