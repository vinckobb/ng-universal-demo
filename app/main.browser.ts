import 'preboot';
import './dependencies.browser';
import './dependencies';
import 'zone.js/dist/zone';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { NgModuleRef, enableProdMode, ApplicationRef } from '@angular/core';
import {BrowserAppModule} from './boot/browser-app.module';
import {enableDebugTools} from '@angular/platform-browser';
import * as config from 'config/global';

if(isProduction)
{
    enableProdMode();
}

/**
 * Runs callback function when angular module is bootstrapped and stable
 * @param {Promise<NgModuleRef<{}>>} moduleRefPromise Promise for module that was bootstrapped
 * @param {(moduleRef: NgModuleRef<{}>) => void} callback Callback that is called
 * @param {boolean} angularProfiler Indication that angular profiler should be enabled
 */
function runWhenModuleStable(moduleRefPromise: Promise<NgModuleRef<{}>>, callback: (moduleRef: NgModuleRef<{}>) => void, angularProfiler?: boolean): void
{
    angularProfiler = angularProfiler || false;

    moduleRefPromise.then((moduleRef: NgModuleRef<{}>) => 
    {
        const appRef: ApplicationRef = moduleRef.injector.get(ApplicationRef);

        appRef.isStable
            .filter((isStable: boolean) => isStable)
            .first()
            .subscribe(() => 
            {
                if(angularProfiler)
                {
                    enableDebugTools(appRef.components[0]);
                }

                callback(moduleRef)
            });
    });
}

runWhenModuleStable(platformBrowserDynamic().bootstrapModule(BrowserAppModule), (moduleRef: NgModuleRef<{}>) => 
{
    const bootstrap = moduleRef.instance['ngOnBootstrap'];
    bootstrap && bootstrap();

    setTimeout(() =>
    {
        preboot.complete();
    }, 100);
}, config.debug);

