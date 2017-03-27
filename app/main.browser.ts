import './hacks';
import './dependencies.browser';
import './dependencies';
import 'zone.js/dist/zone';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModuleRef} from '@angular/core';
import {Utils} from '@ng/common';
import {BrowserAppModule} from './boot/browser-app.module';
import * as config from 'config/global';

Utils.common.runWhenModuleStable(platformBrowserDynamic().bootstrapModule(BrowserAppModule), (moduleRef: NgModuleRef<{}>) => 
{
    const bootstrap = moduleRef.instance['ngOnBootstrap'];
    bootstrap && bootstrap();

    setTimeout(() =>
    {
        preboot.complete();
    }, 100);
}, config.debug);

