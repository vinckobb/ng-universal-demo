import './hacks';
import 'preboot';
import './dependencies.browser';
import './dependencies';
import 'zone.js/dist/zone';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModuleRef} from '@angular/core';
import {hmrAccept, hmrFinishedNotification, Utils} from '@ng/common';
import {BrowserAppModule} from './boot/browser-app.module';
import * as config from 'config/global';

// Enable Hot Module Reloading if available
hmrAccept(platform);
var platform = platformBrowserDynamic();

Utils.common.runWhenModuleStable(platform.bootstrapModule(BrowserAppModule), (moduleRef: NgModuleRef<{}>) => 
{
    const bootstrap = moduleRef.instance['ngOnBootstrap'];
    bootstrap && bootstrap();

    hmrFinishedNotification();

    setTimeout(() =>
    {
        preboot.complete();
    }, 100);
}, config.debug);
