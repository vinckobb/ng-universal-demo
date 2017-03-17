import './dependencies.browser';
import './dependencies';
import 'zone.js/dist/zone';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAppModule } from './boot/browser-app.module';
import {hmrAccept, hmrFinishedNotification} from '@ng/common';

// Enable Hot Module Reloading if available
hmrAccept(platform);
var platform = platformBrowserDynamic();

platform.bootstrapModule(BrowserAppModule).then(() =>
{
    hmrFinishedNotification();
    // (<any>preboot).complete();
});