import {Component} from '@angular/core'
import {TranslateService} from "@ngx-translate/core";
import * as global from 'config/global';

@Component(
{
    selector: 'app',
    templateUrl: "app.component.html"
})
export class AppComponent
{
    constructor(translate: TranslateService) 
    {
        var currentLang: string = global.defaultLanguage;

        translate.setDefaultLang(currentLang);
        translate.use(currentLang);
    }
}
