import {NgModule, ClassProvider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {InterceptableHttpModule} from '@ng/http-extensions';
import {ExternalTranslationLoader} from '@ng/external-translation-loader';
import {NotificationsModule} from '@ng/notifications';
import {CommonModule as NgCommonModule} from '@ng/common';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

import {AppComponent} from './app.component';
import {appComponents, appRoutesModule} from './app.component.routes';
import {CommonSharedModule} from './commonShared.module';
import {providers} from './app.config';

@NgModule(
{
    imports:
    [
        BrowserModule.withServerTransition(
        {
            appId: 'my-app-id'
        }),
        HttpModule,
        InterceptableHttpModule.forRoot(),
        TranslateModule.forRoot(
        {
            loader: <ClassProvider>{provide: TranslateLoader, useClass: ExternalTranslationLoader}
        }),
        NotificationsModule.forRoot(),
        NgCommonModule.forRoot(),
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
