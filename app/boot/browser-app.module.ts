import {NgModule} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule as NgCommonModule} from '@ng/common';
import {BrowserTransferStateRestModule, TransferStateService} from '@ng/rest';
import {ExceptionHandlingModule, ReportingExceptionHandlerOptions} from '@ng/error-handling';
//import {BrowserPrebootModule} from 'preboot/browser';

import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import {GlobalizationService as GlobalizationServiceImpl} from '../services/globalization/globalization.service';
import * as config from 'config/global';

/**
 * Factory for ReportingExceptionHandlerOptions
 */
export function reportingExceptionHandlerOptionsFactory()
{
    return new ReportingExceptionHandlerOptions(config.debug, true, false, false, false, false);
}

/**
 * Entry module for browser side
 */
@NgModule(
{
    bootstrap: [AppComponent],
    imports:
    [
        AppModule,
        BrowserAnimationsModule,
        BrowserTransferStateRestModule.forRoot(),
        NgCommonModule.forRootBrowserWithGlobalization(GlobalizationServiceImpl),
        ExceptionHandlingModule.forRootWithOptions(reportingExceptionHandlerOptionsFactory),
        ServiceWorkerModule.register('/ngsw-worker.js')
        //BrowserPrebootModule.replayEvents()
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
        this._transferState.deactivate();
    }

    //######################### constructor #########################
    constructor(private _transferState: TransferStateService)
    {
    }
}
