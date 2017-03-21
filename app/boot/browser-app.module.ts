import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserTransferStateRestModule, TransferStateService} from '@ng/rest';
import {InterceptableHttpModule} from '@ng/http-extensions';
import {ExceptionHandlingModule, ReportingExceptionHandlerOptions} from '@ng/error-handling';
import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import * as config from 'config/global';

/**
 * Factory for ReportingExceptionHandlerOptions
 */
export function reportingExceptionHandlerOptionsFactory()
{
	return new ReportingExceptionHandlerOptions(config.debug, true, false, false, false, false);
}

@NgModule(
{
	bootstrap: [AppComponent],
	imports:
	[
		AppModule,
		BrowserAnimationsModule,
		BrowserTransferStateRestModule.forRoot(),
		InterceptableHttpModule.forRoot(),
		ExceptionHandlingModule.forRootWithOptions(reportingExceptionHandlerOptionsFactory)
	]
})
export class BrowserAppModule
{
	constructor(private _transferState: TransferStateService)
	{
	}

	// Gotcha
	ngOnBootstrap = () =>
	{
		this._transferState.deactivate();
	}
}
