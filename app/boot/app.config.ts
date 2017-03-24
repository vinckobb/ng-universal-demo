import {ClassProvider, FactoryProvider} from '@angular/core';
import {PROGRESS_INTERCEPTOR_PROVIDER} from "@ng/http-extensions/dist";
import {ExternalTranslationLoaderOptions} from '@ng/external-translation-loader';

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
 * Array of providers that are used in app module
 */
export var providers = 
[
    //######################### HTTP INTERCEPTORS #########################
    PROGRESS_INTERCEPTOR_PROVIDER,

    //######################### TRANSLATE PROVIDERS #########################
    <FactoryProvider>
    {
        provide: ExternalTranslationLoaderOptions,
        useFactory: externalTranslationLoaderOptionsFactory
    },
];
