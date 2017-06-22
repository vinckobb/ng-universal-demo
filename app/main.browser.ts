import './dependencies';
import './dependencies.browser';
import 'preboot';
import 'zone.js/dist/zone';
import './hacks';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModuleRef, enableProdMode} from '@angular/core';
import {Utils} from '@ng/common';
import {BrowserAppModule} from './boot/browser-app.module';
import * as config from 'config/global';

if(isProduction)
{
    enableProdMode();
}

Utils.common.runWhenModuleStable(platformBrowserDynamic().bootstrapModule(BrowserAppModule), (moduleRef: NgModuleRef<{}>) => 
{
    const bootstrap = moduleRef.instance['ngOnBootstrap'];
    bootstrap && bootstrap();

    setTimeout(() =>
    {
        preboot.complete();
    }, 100);
}, config.debug);

