import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
//import {NoopAnimationsModule} from '@angular/platform-browser/animations';
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
    constructor(private transferState: TransferStateService) 
    {
    }
// Gotcha
    ngOnBootstrap = () => 
    {
        this.transferState.inject();
    }
}
