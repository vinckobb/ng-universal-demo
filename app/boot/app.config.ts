import {ClassProvider, FactoryProvider} from '@angular/core';
import {GlobalizationService, ProgressIndicatorService} from '@ng/common';
import {PROGRESS_INTERCEPTOR_PROVIDER} from "@ng/http-extensions/dist";
import {ExternalTranslationLoaderOptions} from '@ng/external-translation-loader';
import {HttpErrorInterceptorOptions} from "@ng/error-handling/dist";

import {GlobalizationService as GlobalizationServiceImpl} from '../services/globalization/globalization.service';
import * as global from 'config/global';

/**
 * Factory method that is used for creating InterceptableHttp
 */
export function externalTranslationLoaderOptionsFactory()
{
    return new ExternalTranslationLoaderOptions("config/i18n",
                                                ["global", 
                                                 "navigation", 
                                                 "pages/home",
                                                 "pages/samplePages"],
                                                ".json")
}

/**
 * Factory method that gets options for http error interceptor
 */
export function httpErrorInterceptorOptionsFactory()
{
    return new HttpErrorInterceptorOptions(global.debug, true);
}

/**
 * Array of providers that are used in app module
 */
export var providers = 
[
    //######################### HTTP INTERCEPTORS #########################
    PROGRESS_INTERCEPTOR_PROVIDER,

    //######################### PROGRESS INDICATOR #########################
    ProgressIndicatorService,

    //######################### TRANSLATE PROVIDERS #########################
    <FactoryProvider>
    {
        provide: ExternalTranslationLoaderOptions,
        useFactory: externalTranslationLoaderOptionsFactory
    },

    //######################### GLOBALIZATION #########################
    <ClassProvider>
    {
        provide: GlobalizationService,
        useClass: GlobalizationServiceImpl
    },

    //######################### ERROR HANDLING PROVIDERS #########################
    <FactoryProvider>
    {
        provide: HttpErrorInterceptorOptions,
        useFactory: httpErrorInterceptorOptionsFactory
    }
];
