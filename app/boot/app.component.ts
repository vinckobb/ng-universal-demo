import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel} from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
import {LANG_COOKIE} from '../misc/constants';
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
export class AppComponent implements OnInit
{
    //######################### private fields #########################
    
    //######################### constructor #########################
    constructor(translate: TranslateService,
                router: Router) 
    {
        var currentLang: string = global.defaultLanguage;

        translate.setDefaultLang(currentLang);
        translate.use(currentLang);
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit()
    {
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
    }
}