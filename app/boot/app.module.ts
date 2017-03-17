import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeView} from '../pages/home/home-view.component';
import {appComponents, appRoutesModule} from './app.component.routes';

@NgModule(
{
    imports: [BrowserModule.withServerTransition({appId: 'my-app-id'}), CommonModule, HttpModule, appRoutesModule],
    providers: [],
    declarations: [AppComponent, ...appComponents],
    exports: [AppComponent]
})
export class AppModule
{
}
