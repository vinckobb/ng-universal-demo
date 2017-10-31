import './dependencies';
import * as xhr2 from 'xhr2';

//HACK - enables setting cookie header
xhr2.prototype._restrictedHeaders.cookie = false;

import 'form-data';
import 'zone.js/dist/zone-node';
import './hacks';
import {enableProdMode, StaticProvider, NgModuleRef} from '@angular/core';
import {platformDynamicServer} from '@angular/platform-server';
import {serverRenderFactory} from "@ng/server-stuff";
import {ServerAppModule} from './boot/server-app.module';
import {AdditionalData, getAdditionalProviders} from './server.providers';

enableProdMode();

/**
 * Gets bootstrapped server module
 * @param extraProviders Extra providers proveded for module
 */
function getNgModule(extraProviders: StaticProvider[]): Promise<NgModuleRef<{}>>
{
    return platformDynamicServer(extraProviders).bootstrapModule(ServerAppModule);
}

exports.serverRender = serverRenderFactory<AdditionalData>(getNgModule, getAdditionalProviders);