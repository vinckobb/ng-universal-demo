import {FactoryProvider, APP_INITIALIZER} from '@angular/core';
import {AuthenticationService} from '@ng/authentication';
import {PROGRESS_INTERCEPTOR_PROVIDER} from '@ng/common';

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
 * Array of providers that are used in app module
 */
export var providers = 
[
    //######################### HTTP INTERCEPTORS #########################
    PROGRESS_INTERCEPTOR_PROVIDER,

    //######################### APP INITIALIZER #########################
    <FactoryProvider>
    {
        useFactory: appInitializerFactory,
        provide: APP_INITIALIZER,
        deps: [AuthenticationService],
        multi: true
    }
];
