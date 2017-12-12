import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {ExceptionHandlingModule, ReportingExceptionHandlerOptions} from '@ng/error-handling';
import {ServerProvidersModule} from '@ng/server-stuff';

import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import * as config from 'config/global';

/**
 * Factory for ReportingExceptionHandlerOptions
 */
export function reportingExceptionHandlerOptionsFactory()
{
	return new ReportingExceptionHandlerOptions(config.debug, false, false, false, false, false);
}

/**
 * Entry module for server side
 */
@NgModule(
{
    bootstrap: [AppComponent],
    imports: 
    [
        ServerModule,
        AppModule,
        ServerProvidersModule.forRoot(),
        ExceptionHandlingModule.forRootWithOptions(reportingExceptionHandlerOptionsFactory)
    ]
})
export class ServerAppModule 
{
}
