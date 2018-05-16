import {Injectable, Injector} from "@angular/core";
import {AuthenticationService, AUTHENTICATION_SERVICE_OPTIONS, AuthenticationServiceOptions, AuthInterceptorConfig} from "@ng/authentication";

import {UserIdentity} from "@ng/authentication/dist/common/userIdentity";

/**
 * Auth Interceptor Config implementation
 */
@Injectable()
export class AuthConfig extends AuthInterceptorConfig
{
    //######################### private fields #########################

    /**
     * Auth service
     */
    private _authSvc: AuthenticationService<any>;

    /**
     * Account service
     */
    private _accountSvc: AuthenticationServiceOptions<any>;

    /**
     * Indication that call of get identity is blocked
     */
    private _blocked: boolean = false;

    /**
     * Resolve method for blocked auth
     */
    private _blockedPromise: Promise<boolean>;

    //######################### private properties #########################

    /**
     * Gets auth service
     */
    private get AuthSvc(): AuthenticationService<any>
    {
        return this._authSvc || (this._authSvc = this._injector.get(AuthenticationService));
    }

    /**
     * Gets account service
     */
    private get AccountSvc(): AuthenticationServiceOptions<any>
    {
        return this._accountSvc || (this._accountSvc = this._injector.get(AUTHENTICATION_SERVICE_OPTIONS));
    }

    //######################### constructor #########################
    constructor(private _injector: Injector)
    {
        super();
    }

    //######################### public methods - overriden AuthInterceptorConfig #########################

    /**
     * Gets indication whether is user authenticated or not
     * @returns boolean
     */
    public isAuthenticated(): Promise<boolean>
    {
        return new Promise((resolve, reject) =>
        {
            if(this._blocked)
            {
                this._blockedPromise.then(block => block ? reject() : resolve(true));
            }
            else
            {
                let resolveBlock;

                this._blockedPromise = new Promise(resolve =>
                {
                    resolveBlock = resolve;
                });

                this.AuthSvc.getUserIdentity(true)
                    .catch(error => reject(error))
                    .then((identity: UserIdentity<any>) =>
                    {
                        this._blocked = !identity.isAuthenticated;

                        if(this._blocked)
                        {
                            resolveBlock(true);
                        }
                        else
                        {
                            resolveBlock(false);
                        }

                        resolve(identity.isAuthenticated);
                    });
            }

            this._blocked = true;
        });
    }

    /**
     * Gets indication whether request was done from authentication page
     * @returns boolean
     */
    public isAuthPage(): boolean
    {
        return this.AccountSvc.isAuthPage();
    }

    /**
     * Redirects current page to authentication page
     */
    public showAuthPage(): void
    {
        this.AccountSvc.showAuthPage();
    }

    /**
     * Redirects current page to access denied page
     */
    public showAccessDenied(): void
    {
        this.AccountSvc.showAccessDenied();
    }

    //######################### public methods #########################

    /**
     * Unblocks call of getting user identity
     */
    public unblock()
    {
        this._blocked = false;
        this._blockedPromise = null;
    }
}