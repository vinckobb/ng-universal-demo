import {NgModule, ClassProvider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {ExternalTranslationLoader} from '@ng/external-translation-loader';
import {NotificationsModule} from '@ng/notifications';
import {CommonModule as NgCommonModule} from '@ng/common';
import {AuthorizationModule} from '@ng/authentication';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

import {AppComponent} from './app.component';
import {AccountService} from "../services/api/account/account.service";
import {appComponents, appRoutesModule} from './app.component.routes';
import {CommonSharedModule} from './commonShared.module';
import {APP_TRANSFER_ID} from '../misc/constants';
import {providers} from './app.config';

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
        CommonSharedModule,
        appRoutesModule
    ],
    providers: providers,
    declarations: [AppComponent, ...appComponents],
    exports: [AppComponent]
})
export class AppModule
{
}
