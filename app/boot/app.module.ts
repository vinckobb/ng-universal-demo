import {NgModule, ClassProvider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {ExternalTranslationLoader} from '@ng/external-translation-loader';
import {NotificationsModule} from '@ng/notifications';
import {CommonModule as NgCommonModule} from '@ng/common';
import {AuthorizationModule} from '@ng/authentication';
import {ServerValidationsModule, HttpErrorInterceptorModule, HttpErrorInterceptorOptions, InternalServerErrorModule} from '@ng/error-handling';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

import {AppComponent} from './app.component';
import {NavigationComponent} from '../components/navigation/navigation.component';
import {AccountService} from "../services/api/account/account.service";
import {appComponents, appRoutesModule} from './app.component.routes';
import {CommonSharedModule} from './commonShared.module';
import {APP_TRANSFER_ID} from '../misc/constants';
import {providers} from './app.config';
import * as config from 'config/global';

/**
 * Factory for HttpErrorInterceptorOptions
 */
export function HttpErrorInterceptorModuleFactory()
{
    return new HttpErrorInterceptorOptions(config.debug);
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
        NotificationsModule.forRoot(),
        NgCommonModule.forRoot(),
        AuthorizationModule.forRoot(AccountService),
        ServerValidationsModule.forRoot(),
        InternalServerErrorModule.forRoot(),
        HttpErrorInterceptorModule.forRootWithOptions(HttpErrorInterceptorModuleFactory),
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
