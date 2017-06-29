import {Injectable, Optional, Inject, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {RESTClient, GET, BaseUrl, DefaultHeaders, ResponseTransform, TransferStateService, POST} from '@ng/rest';
import {SERVER_BASE_URL, SERVER_COOKIE_HEADER, SERVER_AUTH_HEADER} from "@ng/common";
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
    public constructor(http: Http,
                       private _injector: Injector,
                       private _location: Location,
                       @Optional() transferState?: TransferStateService,
                       @Optional() @Inject(SERVER_BASE_URL) baseUrl?: string,
                       @Optional() @Inject(SERVER_COOKIE_HEADER) serverCookieHeader?: string,
                       @Optional() @Inject(SERVER_AUTH_HEADER) serverAuthHeader?: string)
    {
        super(http, transferState, baseUrl, serverCookieHeader, serverAuthHeader);
    }

    //######################### public methods - implementation of AuthenticationServiceOptions #########################

    /**
     * Method logs user into system
     * @param  {AccessToken} accessToken Access token used for authentication
     * @returns Observable
     */
    public login(accessToken: AccessToken): Observable<any>
    {
        var headers = new Headers();
        headers.append('Accept', 'application/json, text/plain, */*');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        var options = new RequestOptions(
        {
            headers: headers
        });

        return this.http.post(`${global.apiBaseUrl}authentication`,
                              $.param(
                              {
                                  "j_username": accessToken.userName,
                                  "j_password": accessToken.password,
                                  "remember-me": accessToken.rememberMe
                              }),
                              options);
    }

    /**
     * Gets indication whether current state of app is displaying login page
     * @returns boolean
     */
    public isAuthPage(): boolean
    {
        return this._location.path().indexOf('/login') == 0;
    }

    /**
     * Methods logs out user out of system
     * @returns Observable
     */
    @POST('logout')
    public logout(): Observable<any>
    {
        return null;
    }

    /**
     * Gets information about user
     * @returns Observable
     */
    @ResponseTransform()
    @GET("myaccount")
    public getUserIdentity(): Observable<UserIdentity<any>>
    {
        return null;
    }

    /**
     * Redirects current page to authentication page
     */
    public showAuthPage(): void
    {
        this._injector.get(Router).navigate(['/login'], {queryParams: {returnUrl: this._location.path()}});
    }

    /**
     * Redirects current page to access denied page
     */
    public showAccessDenied(): void
    {
        this._injector.get(Router).navigate(['/accessDenied']);
    }

    //######################### private methods #########################

    /**
     * Method transforms response of get method
     * @param  {Observable<IFinancialRecordResponse>} response Response to be transformed
     * @returns Observable Transformed response
     */
    private getUserIdentityResponseTransform(response: Observable<Response>): Observable<any>
    {
        return response.catch((error: Response) =>
        {
            if(error.status == 401)
            {
                return Observable.create((observer: Observer<any>) =>
                {
                    observer.next(
                    {
                        isAuthenticated: false,
                        userName: "",
                        permissions: ["login-page"],
                        firstName: "",
                        surname: ""
                    });
                    
                    observer.complete();
                });
            }

            return Observable.throw(error);
        })
        .map(data =>
        {
            if(data instanceof Response)
            {
                var tmp: any = data.json();

                return {
                    isAuthenticated: true,
                    userName: tmp.login,
                    firstName: '',      // FIXME tmp.firstName,
                    surname: tmp.login, // FIXME tmp.lastName,
                    permissions: tmp.privileges
                };
            }
            else
            {
                return data;
            }
        });
    }
}