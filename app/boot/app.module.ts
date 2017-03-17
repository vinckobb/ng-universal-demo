import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeView} from '../pages/home/home-view.component';
import {appComponents, appRoutesModule} from './app.component.routes';
import {CommonSharedModule} from './commonShared.module';
import {providers} from './app.config';

@NgModule(
{
    imports: [BrowserModule.withServerTransition({appId: 'my-app-id'}), HttpModule, CommonSharedModule, appRoutesModule],
    providers: [providers],
    declarations: [AppComponent, ...appComponents],
    exports: [AppComponent]
})
export class AppModule
{
}
