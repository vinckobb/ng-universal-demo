import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {TransferStateService} from '@ng/rest';
import {ServerTransferStateRestModule, ServerInterceptableHttpModule} from '@ng/server-stuff';
import {ExceptionHandlingModule, ReportingExceptionHandlerOptions} from '@ng/error-handling';

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
        ServerTransferStateRestModule.forRoot(),
        ServerInterceptableHttpModule.forRoot(),
        ExceptionHandlingModule.forRootWithOptions(reportingExceptionHandlerOptionsFactory)
    ]
})
export class ServerAppModule 
{
    //######################### public properties #########################
    
    /**
     * Method called when application is stable 
     */
    public ngOnBootstrap = () => 
    {
        this._transferState.inject();
    }

    //######################### constructor #########################
    constructor(private _transferState: TransferStateService) 
    {
    }
}