import {Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID} from '@angular/core';
import {Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";
import {SwUpdate} from "@angular/service-worker";
import {CookieService, APP_STABLE} from '@ng/common';
import {AuthenticationService} from "@ng/authentication";
import {TranslateService} from '@ngx-translate/core';

import {LANG_COOKIE} from '../../misc/constants';
import {ConfigReleaseService} from "../../services/api/configRelease/configRelease.service";
import {ConfigReleaseData} from "../../services/api/configRelease/configRelease.interface";
import {Subscription} from 'rxjs/Subscription';
import {interval} from 'rxjs/observable/interval';
import * as global from 'config/global';
import * as version from 'config/version';

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

    /**
     * Indication whether is code running in browser
     */
    private _isBrowser: boolean = isPlatformBrowser(this._platformId);

    /**
     * Subscription for update check
     */
    private _updateCheckSubscription: Subscription;

    //######################### public properties #########################

    /**
     * List of available languages
     */
    public availableLanguages = global.availaleLanguages;

    /**
     * Indication that update is available
     */
    public updateAvailable: boolean = false;

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
    public guiVersion: string = `Universal: ${version.version}`;

    //######################### constructor #########################
    constructor(private _configReleaseService: ConfigReleaseService,
                private _authService: AuthenticationService<any>,
                private _router: Router,
                private translate: TranslateService,
                private _cookies: CookieService,
                private _changeDetector: ChangeDetectorRef,
                private _update: SwUpdate,
                @Inject(APP_STABLE) private _appStablePromise: Promise<void>,
                @Inject(PLATFORM_ID) private _platformId: Object)
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
        if(this._isBrowser && this._update.isEnabled)
        {
            this._update.activated.subscribe(() => window.location.reload());
            this._update.available.subscribe(() =>
            { 
                this.updateAvailable = true;
                this._changeDetector.detectChanges();
            });

            this._appStablePromise.then(() =>
            {
                this._update.checkForUpdate();

                this._updateCheckSubscription = interval(3600000)
                    .subscribe(() => this._update.checkForUpdate());
            });
        }

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
                else
                {
                    this.fullName = '';
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

        if(this._updateCheckSubscription)
        {
            this._updateCheckSubscription.unsubscribe();
            this._updateCheckSubscription = null;
        }
    }

    //######################### public methods #########################

    /**
     * Activates update
     */
    public activateUpdate()
    {
        if(this._isBrowser)
        {
            this._update.activateUpdate();
        }
    }

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