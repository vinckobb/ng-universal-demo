import 'web-animations-js';
import 'dependencies.ts';
import 'zone.js/dist/zone';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAppModule } from './app/browser-app.module';

platformBrowserDynamic().bootstrapModule(BrowserAppModule);
