import {FactoryProvider, APP_INITIALIZER, ClassProvider} from '@angular/core';
import {AuthenticationService, AUTHENTICATION_SERVICE_OPTIONS} from '@ng/authentication';
import {PROGRESS_INTERCEPTOR_PROVIDER, GlobalizationService} from '@ng/common';
import {HttpErrorInterceptorOptions, HTTP_ERROR_INTERCEPTOR_PROVIDER, REPORTING_EXCEPTION_HANDLER_PROVIDER} from '@ng/error-handling';
import * as config from 'config/global';

import {GlobalizationService as GlobalizationServiceImpl} from '../services/globalization/globalization.service';
import {AccountService} from "../services/api/account/account.service";

/**
 * Creates APP initialization factory, that first try to authorize user before doing anything else
 * @param authService Authentication service used for authentication of user
 */
export function appInitializerFactory(authService: AuthenticationService<any>)
{
    return () =>
    {
        return new Promise(success =>
        {
            authService
                .getUserIdentity()
                .then(() => success())
                .catch(reason => alert(`Authentication failed: ${reason}`));
        });
    };
}

/**
 * Factory for HttpErrorInterceptorOptions
 */
export function httpErrorInterceptorOptionsFactory()
{
    return new HttpErrorInterceptorOptions(config.debug);
}

/**
 * Array of providers that are used in app module
 */
export var providers = 
[
    //######################### HTTP INTERCEPTORS #########################
    PROGRESS_INTERCEPTOR_PROVIDER,
    HTTP_ERROR_INTERCEPTOR_PROVIDER,

    //######################### GLOBALIZATION SERVICE #########################
    <ClassProvider>
    {
        provide: GlobalizationService,
        useClass: GlobalizationServiceImpl
    },

    //######################### AUTHENTICATION & AUTHORIZATION #########################
    <ClassProvider>
    {
        provide: AUTHENTICATION_SERVICE_OPTIONS,
        useClass: AccountService
    },

    //######################### ERROR HANDLING #########################
    <FactoryProvider>
    {
        provide: HttpErrorInterceptorOptions,
        useFactory: httpErrorInterceptorOptionsFactory
    },
    REPORTING_EXCEPTION_HANDLER_PROVIDER,
    
    //######################### APP INITIALIZER #########################
    <FactoryProvider>
    {
        useFactory: appInitializerFactory,
        provide: APP_INITIALIZER,
        deps: [AuthenticationService],
        multi: true
    }
];
