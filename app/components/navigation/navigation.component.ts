import {Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from '@ng/common';
import {AuthenticationService} from "@ng/authentication";
import {TranslateService} from '@ngx-translate/core';

import {LANG_COOKIE} from '../../misc/constants';
import {ConfigReleaseService} from "../../services/api/configRelease/configRelease.service";
import {ConfigReleaseData} from "../../services/api/configRelease/configRelease.interface";
import {Subscription} from 'rxjs/Subscription';
import * as global from 'config/global';

/**
 * Navigation component containing navigation menu
 */
@Component(
{
    selector: 'nav',
    templateUrl: 'navigation.component.html',
    providers: [ConfigReleaseService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit, OnDestroy
{
    //######################### private fields #########################
    
    /**
     * Subscription for change of authentication
     */
    private _authSubscription: Subscription = null;

    /**
     * Subscription for navigation changes
     */
    private _navigationSubscription: Subscription = null;
    //######################### public properties #########################

    /**
     * List of available languages
     */
    public availableLanguages = global.availaleLanguages;

    /**
     * Instance of config object
     */
    public config: ConfigReleaseData = null;

    /**
     * Logged user full name
     */
    public fullName: string = "";

    /**
     * Name of active language
     */
    public activeLang: string = "";

    /**
     * Displayed gui version
     */
    public guiVersion: string = `Universal: ${global.version}`;

    //######################### constructor #########################
    constructor(private _configReleaseService: ConfigReleaseService,
                private _authService: AuthenticationService<any>,
                private _router: Router,
                private translate: TranslateService,
                private _cookies: CookieService,
                private _changeDetector: ChangeDetectorRef)
    {
        this._navigationSubscription = this._router
            .events
            .subscribe(itm => this._changeDetector.detectChanges());
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit()
    {
        this.translate.onLangChange.subscribe(itm =>
        {
            this.activeLang = itm.lang;
        })

        this._authService
            .getUserIdentity()
            .then(userIdentity =>
            {
                if(userIdentity.isAuthenticated)
                {
                    this.fullName = `${userIdentity.firstName} ${userIdentity.surname}`;
                    this._changeDetector.detectChanges();
                }
            });

        this._authSubscription = this._authService
            .authenticationChanged
            .subscribe(userIdentity =>
            {
                if(userIdentity.isAuthenticated)
                {
                    this.fullName = `${userIdentity.firstName} ${userIdentity.surname}`;
                    this._changeDetector.detectChanges();
                }
            });
        
        this._configReleaseService.get().subscribe(data =>
        {
            this.config = data;
            this._changeDetector.detectChanges();
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._authSubscription)
        {
            this._authSubscription.unsubscribe();
            this._authSubscription = null;
        }

        if(this._navigationSubscription)
        {
            this._navigationSubscription.unsubscribe();
            this._navigationSubscription = null;
        }
    }

    //######################### public methods #########################

    /**
     * Changes selected language for translation
     * @param  {string} lang
     */
    public changeLang(lang: string)
    {
        this.translate.use(lang);
        //this.appService.setLanguage(lang).subscribe();
        this._cookies.setCookie(LANG_COOKIE, lang, 365);
    }

    /**
     * Performs logout from system
     */
    public logout()
    {
        this._authService
            .logout()
            .subscribe(data =>
            {
                this._router.navigate(['/login']);
            });
    }
}