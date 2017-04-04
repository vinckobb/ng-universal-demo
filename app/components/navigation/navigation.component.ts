import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {LANG_COOKIE} from '../../misc/constants';
import * as global from 'config/global';

/**
 * Navigation component containing navigation menu for finweb
 */
@Component(
{
    selector: 'nav',
    templateUrl: "navigation.component.html"
})
export class NavigationComponent
{
    //######################### public properties #########################

    /**
     * List of available languages
     */
    public availableLanguages = global.availaleLanguages;

    /**
     * Name of active language
     */
    public activeLang: string = "";

    //######################### constructor #########################
    constructor(private translate: TranslateService)
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