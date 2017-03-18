import {Component, OnInit} from '@angular/core'
import {GlobalNotificationsService} from '@ng/notifications';
import {TranslateService} from "@ngx-translate/core";
import * as global from 'config/global';

@Component(
{
    selector: 'app',
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit
{
    constructor(translate: TranslateService,
                private _notifications: GlobalNotificationsService) 
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
        //this._notifications.info("App loaded ok.");
    }
}
