import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ComponentRoute} from '@ng/common';
import {FlyInOutAnimation} from '@ng/animations';
import {AuthenticationService, Authorize, AuthGuard} from '@ng/authentication';
import {BaseAnimatedComponent} from "../../misc/baseAnimatedComponent";
import {Observable} from 'rxjs/Observable';

/**
 * Page containing login form
 */
@Component(
{
    selector: 'login-view',
    templateUrl: 'login.component.html',
    animations: [FlyInOutAnimation]
})
@ComponentRoute({path: 'login', canActivate: [AuthGuard]})
@Authorize("login-page")
export class LoginComponent extends BaseAnimatedComponent
{
    //######################### public properties #########################

    /**
     * Indication that logged user should be remembered
     */    
    public rememberMe: boolean = true;

    /**
     * Username for logging in
     */
    public username: string = "";
    
    /**
     * Password for logging in
     */
    public password: string = "";

    /**
     * Indication that there is authentication error
     */
    public authenticationError: boolean = false;
    
    //######################### constructor #########################
    constructor(private _authService: AuthenticationService<any>,
                private _router: Router,
                private _activeRoute: ActivatedRoute)
    {
        super();
    }
    
    //######################### public methods #########################
    
    /**
     * Logs in user
     */
    public login()
    {
        this._authService
            .login(
            {
                userName: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .catch(() =>
            {
                this.authenticationError = true;
                
                return Observable.empty();
            })
            .subscribe(() =>
            {
                this.authenticationError = false;
                
                if(this._activeRoute.snapshot.queryParams.returnUrl)
                {
                    this._router.navigateByUrl(this._activeRoute.snapshot.queryParams.returnUrl);
                }
                else
                {
                    this._router.navigate(['/']);
                }
            });
    }
}