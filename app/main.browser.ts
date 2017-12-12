import './dependencies';
import './dependencies.browser';
import 'zone.js/dist/zone';
import './hacks';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModuleRef, enableProdMode} from '@angular/core';
import {Utils} from '@ng/common';
import {RestTransferStateService} from '@ng/rest';
import {BrowserAppModule} from './boot/browser-app.module';
import * as config from 'config/global';

if(isProduction)
{
    enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => 
{
    Utils.common.runWhenModuleStable(platformBrowserDynamic().bootstrapModule(BrowserAppModule), (moduleRef: NgModuleRef<{}>) => 
    {
        moduleRef.injector.get(RestTransferStateService).clearAndDeactivate();
    }, config.debug);
});