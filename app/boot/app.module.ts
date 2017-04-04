import {NgModule, ClassProvider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

import {AppComponent} from './app.component';
import {NavigationComponent} from '../components/navigation/navigation.component';
import {appComponents, appRoutesModule} from './app.component.routes';
import {CommonSharedModule} from './commonShared.module';
import {APP_TRANSFER_ID} from '../misc/constants';
import {providers} from './app.config';
import * as config from 'config/global';

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
