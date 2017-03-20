import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers} from '@angular/http';
import {RESTClient, GET, BaseUrl, DefaultHeaders, Produces, ResponseType} from '@ng/rest';
import {AuthenticationServiceOptions, UserIdentity, AccessToken} from '@ng/authentication';

import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import * as global from 'config/global';

/**
 * Service used to access user account information
 */
@Injectable()
@BaseUrl(global.apiBaseUrl)
@DefaultHeaders(global.defaultApiHeaders)
export class AccountService extends RESTClient implements AuthenticationServiceOptions<any>
{
    //######################### constructor #########################
    public constructor(http: Http, private _router: Router)
    {
        super(http);
    }

    //######################### public methods - implementation of AuthenticationServiceOptions #########################

    /**
     * Method logs user into system
     * @param  {AccessToken} accessToken Access token used for authentication
     * @returns Observable
     */
    public login(accessToken: AccessToken): Observable<any>
    {
        return Observable.empty();
    }

    /**
     * Gets indication whether current state of app is displaying login page
     * @returns boolean
     */
    public isAuthPage(): boolean
    {
        return false;
    }

    /**
     * Methods logs out user out of system
     * @returns Observable
     */
    public logout(): Observable<any>
    {
        return Observable.empty();
    }

    /**
     * Gets information about user
     * @returns Observable
     */
    // @Produces(ResponseType.Json)
    // @GET("authenticate")
    public getUserIdentity(): Observable<UserIdentity<any>>
    {
        return Observable.create((observer: Observer<UserIdentity<any>>) =>
        {
            observer.next(
            {
                firstName: "testo",
                surname: "steron",
                userName: "xxx",
                permissions: ['showWithThis'],
                isAuthenticated: true,
                additionalInfo: {}
            });
        });
    }

    /**
     * Redirects current page to authentication page
     */
    public showAuthPage(): void
    {
        this._router.navigate(['/accessDenied']);
    }

    /**
     * Redirects current page to access denied page
     */
    public showAccessDenied(): void
    {
        this._router.navigate(['/accessDenied']);
    }
}