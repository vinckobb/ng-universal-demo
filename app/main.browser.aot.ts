import './dependencies.browser';
import './dependencies';
import 'zone.js/dist/zone';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAppModule } from './boot/browser-app.module';

platformBrowserDynamic().bootstrapModule(BrowserAppModule);
