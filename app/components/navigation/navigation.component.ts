import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import * as global from 'config/global';

/**
 * Navigation component containing navigation menu
 */
@Component(
{
    selector: 'nav',
    templateUrl: 'navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit
{
    //######################### public properties #########################

    /**
     * List of available languages
     */
    public availableLanguages = global.availaleLanguages;

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
    constructor(private translate: TranslateService,
                private _changeDetector: ChangeDetectorRef)
    {
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
    }
}