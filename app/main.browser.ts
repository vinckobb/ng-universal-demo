import './dependencies';
import './dependencies.browser';
import 'preboot';
import 'zone.js/dist/zone';
import './hacks';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModuleRef, enableProdMode} from '@angular/core';
import {BrowserAppModule} from './boot/browser-app.module';
import * as config from 'config/global';

if(isProduction)
{
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(BrowserAppModule);
preboot.complete();
