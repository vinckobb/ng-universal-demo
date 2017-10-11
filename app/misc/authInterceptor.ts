import {FactoryProvider, Provider, InjectionToken, EventEmitter, Component, Optional, Inject} from '@angular/core';
import {RequestMethod, Request, RequestOptionsArgs, Response} from '@angular/http';
import {HttpInterceptor, HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {isBlank, isFunction} from '@ng/common';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

/**
 * Configuration object that is used by AuthInterceptor, overriding its properties allows you to customize configuration
 */
export abstract class AuthInterceptorConfig
{
    /**
     * Gets indication whether is user authenticated or not
     * @returns boolean 
     */
    abstract IsAuthenticated(): Promise<boolean>;
    
    /**
     * Gets indication whether request was done from authentication page
     * @returns boolean
     */
    abstract IsAuthPage(): boolean;
    
    /**
     * Redirects current page to authentication page
     */
    abstract ShowAuthPage(): void;
    
    /**
     * Redirects current page to access denied page
     */
    abstract ShowAccessDenied(): void;
}

/**
 * Token used for injecting custom configuration for AuthInterceptor
 */
export const AUTH_INTERCEPTOR_CONFIG: InjectionToken<AuthInterceptorConfig>  = new InjectionToken<AuthInterceptorConfig>("auth-interceptor-config");

//AuthInterceptor used for intercepting http responses and handling 401, 403 statuses
export class AuthInterceptor implements HttpInterceptor
{
    //######################### constructors #########################
    constructor(public config: AuthInterceptorConfig)
    {
    }

    //######################### public methods - implementation of HttpInterceptor #########################

    /**
     * Intercepts http request
     * @param {HttpRequest<any>} req Request to be intercepted
     * @param {HttpHandler} next Next middleware that can be called for next processing
     */
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        return next.handle(req);
    }

    //######################### public methods - overriden HttpInterceptor #########################
    interceptResponse(response: Observable<any>): Observable<any>
    {
        return response.catch((err: Response) =>
        {
            return Observable.create((observer: Observer<any>) =>
            {
                if(err.status == 403 || err.status == 401)
                {
                    if(this.config.IsAuthPage())
                    {
                        observer.error(err);
                        observer.complete();

                        return;
                    }

                    this.config.IsAuthenticated()
                        .then(isAuthenticated =>
                        {
                            if(isAuthenticated)
                            {
                                this.config.ShowAccessDenied();
                                
                                observer.complete();

                                return;
                            }
                            
                            this.config.ShowAuthPage();
                            
                            observer.complete();
                            
                            return;
                        });

                    return;
                }
                
                observer.error(err);
                observer.complete();
            });
        });
    }
}

export function authInterceptorProviderFactory(config: AuthInterceptorConfig)
{
    if(isBlank(config) ||
       isBlank(config.IsAuthenticated) || !isFunction(config.IsAuthenticated) ||
       isBlank(config.IsAuthPage) || !isFunction(config.IsAuthPage) ||
       isBlank(config.ShowAccessDenied) || !isFunction(config.ShowAccessDenied) ||
       isBlank(config.ShowAuthPage) || !isFunction(config.ShowAuthPage))
    {
        throw new Error("Provided configuration for 'AuthInterceptor' is not of type 'AutInterceptorConfig', you must provide one!");
    }

    return new AuthInterceptor(config);
};

/**
 * Provider for proper use of AuthInterceptor, use this provider to inject this interceptor
 */
export const AUTH_INTERCEPTOR_PROVIDER: FactoryProvider =
{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useFactory: authInterceptorProviderFactory,
    deps: [AUTH_INTERCEPTOR_CONFIG]
};