import {Component, OnDestroy} from '@angular/core';
import {Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel} from '@angular/router';
import {SwUpdate} from '@angular/service-worker';
import {GlobalizationService, ProgressIndicatorService, CookieService, APP_STABLE} from '@ng/common';
import {AuthenticationService} from '@ng/authentication';
import {TranslateService} from "@ngx-translate/core";
import {LANG_COOKIE} from '../misc/constants';
import {interval} from 'rxjs/observable/interval';
import {Subscription} from 'rxjs/Subscription';
import * as global from 'config/global';
import * as moment from 'moment';

/**
 * Application entry component
 */
@Component(
{
    selector: 'app',
    templateUrl: "app.component.html"
})
export class AppComponent implements OnDestroy
{
    //######################### private fields #########################
    
    /**
     * Subscription for route changes
     */
    private _routeChangeSubscription: Subscription;

    /**
     * Subscription for update check
     */
    private _updateCheckSubscription: Subscription;

    //######################### constructor #########################
    constructor(authetication: AuthenticationService<any>,
                translate: TranslateService,
                globalization: GlobalizationService,
                router: Router,
                progressIndicatorService: ProgressIndicatorService,
                cookieService: CookieService,
                update: SwUpdate) 
    {
        update.activated.subscribe(itm => console.log('activated', itm));
        update.available.subscribe(itm =>
        { 
            console.log('available', itm);
            update.activateUpdate()
                .then(() => console.log("activated done"));
        });

        APP_STABLE.then(() =>
        {
            this._updateCheckSubscription = interval(30000)
                .subscribe(time =>
                {
                    console.log("checking for update ", time);
                    update.checkForUpdate()
                        .then(() => console.log("check done"));
                });
        });

        this._routeChangeSubscription = router.events.subscribe((next) =>
        {
            if(next instanceof NavigationStart)
            {
                progressIndicatorService.showProgress();
            }
            else if(next instanceof NavigationEnd || next instanceof NavigationError || next instanceof NavigationCancel)
            {
                progressIndicatorService.hideProgress();
            }
        })

        var currentLang: string = global.defaultLanguage;
        var storedCookie = cookieService.getCookie(LANG_COOKIE);

        if(storedCookie)
        {
            currentLang = storedCookie;
        }
        
        moment.locale(globalization.getLocale());
        translate.setDefaultLang(currentLang);
        translate.use(currentLang);

        authetication
            .getUserIdentity()
            .then(identity =>
            {
                if(!identity)
                {
                    console.error("User identity was not returned!");
                }

                if(!identity.isAuthenticated && !authetication.isAuthPage())
                {
                    authetication.showAuthPage();
                }
            });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._routeChangeSubscription)
        {
            this._routeChangeSubscription.unsubscribe();
            this._routeChangeSubscription = null;
        }

        if(this._updateCheckSubscription)
        {
            this._updateCheckSubscription.unsubscribe();
            this._updateCheckSubscription = null;
        }
    }
}