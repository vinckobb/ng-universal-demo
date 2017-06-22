import {NgModule, ClassProvider, Optional, Injectable} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

import {AppComponent} from './app.component';
import {NavigationComponent} from '../components/navigation/navigation.component';
import {appComponents, appRoutesModule} from './app.component.routes';
import {CommonSharedModule} from './commonShared.module';
import {APP_TRANSFER_ID} from '../misc/constants';
import {providers} from './app.config';
import * as config from 'config/global';
import {Observable} from "rxjs/Observable";

/**
 * Options that are used within ExternalTranslationLoader
 */
export class ExternalTranslationLoaderOptions
{
    //######################### public properties #########################

    /**
     * Prefix that is used for all requests
     */
    public resourcePrefix: string;

    /**
     * Names of resources that holds translations
     */
    public resources: string[];

    /**
     * Sufix that is used for all requests
     */
    public resourceSufix: string;

    //######################### constructor #########################

    /**
     * Creates instance of ExternalTranslationLoaderOptions
     * @param  {string} resourcePrefix Prefix that is used for all requests
     * @param  {string[]} resources Names of resources that holds translations
     * @param  {string} resourceSufix Sufix that is used for all requests
     */
    constructor(resourcePrefix: string, resources: string[], resourceSufix: string)
    {
        this.resourcePrefix = resourcePrefix;
        this.resources = resources;
        this.resourceSufix = resourceSufix;
    }
}

/**
 * External translation loader, that can be configured with multiple resources
 */
@Injectable()
export class ExternalTranslationLoader implements TranslateLoader
{
    //######################### private fields #########################

    /**
     * Cached results for requested urls
     */
    private _cachedResults: {[url: string]: Promise<any>} = {};

    //######################### constructor #########################
    constructor(@Optional() private _options: ExternalTranslationLoaderOptions,
                @Optional() private _baseUrl: string,
                private _http: Http)
    {
        if(!_baseUrl)
        {
            this._baseUrl = "";
        }

        if(!_options || !(_options instanceof ExternalTranslationLoaderOptions))
        {
            this._options = new ExternalTranslationLoaderOptions("translations", ["lang"], ".json");
        }
    }

    //######################### public methods #########################
    getTranslation(lang: string): Observable<any>
    {
        return Observable.create(observer =>
        {
            var translationsResources: Promise<any>[] = [];
            
            this._options.resources.forEach(itm =>
            {
                let url = `${this._baseUrl}${this._options.resourcePrefix}/${lang}/${itm}${this._options.resourceSufix}`;

                if(this._cachedResults[url])
                {
                    translationsResources.push(this._cachedResults[url]);
                }
                else
                {
                    this._cachedResults[url] = new Promise<any>((resolve, reject) =>
                    {
                        this._http
                            .get(url)
                            .map(itm => itm.json())
                            .subscribe(data => resolve(data), error => reject(error));
                    });

                    translationsResources.push(this._cachedResults[url]);
                }
            });
            
            Observable.forkJoin(translationsResources)
                .subscribe(success =>
                           {
                               var translations = {};
                               
                               for(var index in success)
                               {
                                   $.extend(translations, success[index]);
                               }
                               
                               observer.next(translations);
                               observer.complete();
                           },
                           error =>
                           {
                               observer.error(error);
                               observer.complete();
                           });
        });
    }
}

/**
 * Factory method that is used for creating InterceptableHttp
 */
export function externalTranslationLoaderOptionsFactory()
{
    return new ExternalTranslationLoaderOptions("config/i18n",
                                                ["global", 
                                                 "navigation", 
                                                 "pages/home",
                                                 "pages/samplePages"],
                                                ".json")
}

/**
 * Main module shared for both server and browser side
 */
@NgModule(
{
    imports:
    [
        BrowserModule.withServerTransition(
        {
            appId: APP_TRANSFER_ID
        }),
        HttpModule,
        TranslateModule.forRoot(
        {
            loader: <ClassProvider>{provide: TranslateLoader, useClass: ExternalTranslationLoader}
        }),
        CommonSharedModule,
        appRoutesModule
    ],
    providers: providers,
    declarations: [AppComponent, NavigationComponent, ...appComponents],
    exports: [AppComponent]
})
export class AppModule
{
}
