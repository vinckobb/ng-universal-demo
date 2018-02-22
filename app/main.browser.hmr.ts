import './dependencies';
import './dependencies.browser';
import 'zone.js/dist/zone';
import './hacks';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModuleRef} from '@angular/core';
//@ts-ignore
import {hmrAccept, hmrFinishedNotification} from '@ng/common';
import {Utils} from '@ng/common';
import {RestTransferStateService} from '@ng/rest';
import {BrowserAppModule} from './boot/browser-app.module';
import * as config from 'config/global';

// Enable Hot Module Reloading if available
hmrAccept(platform);
var platform = platformBrowserDynamic();

Utils.common.runWhenModuleStable(platform.bootstrapModule(BrowserAppModule), (moduleRef: NgModuleRef<{}>) => 
{
    moduleRef.injector.get(RestTransferStateService).clearAndDeactivate();
    hmrFinishedNotification();
}, config.debug);
