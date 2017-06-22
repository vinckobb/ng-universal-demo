import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import * as global from 'config/global';

/**
 * Application entry component
 */
@Component(
{
    selector: 'app',
    templateUrl: "app.component.html"
})
export class AppComponent
{

    //######################### constructor #########################
    constructor(translate: TranslateService) 
    {
        var currentLang: string = global.defaultLanguage;

        translate.setDefaultLang(currentLang);
        translate.use(currentLang);
    }
}