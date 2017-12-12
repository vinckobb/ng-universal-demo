import './dependencies';
import * as xhr2 from 'xhr2';

//HACK - enables setting cookie header
xhr2.prototype._restrictedHeaders.cookie = false;

import 'form-data';
import 'zone.js/dist/zone-node';
import './hacks';
import {enableProdMode} from '@angular/core';
import {renderModule} from '@angular/platform-server';
import {serverRenderFactory, ServerRenderOptions} from '@ng/server-stuff';

import {ServerAppModule} from './boot/server-app.module';
import {AdditionalData, getAdditionalProviders} from './server.providers';

enableProdMode();

/**
 * Gets promise that renders app into string
 * @param {ServerRenderOptions} options Options for server render
 */
function getRenderPromise(options: ServerRenderOptions): Promise<string>
{
    return renderModule(ServerAppModule, options);
}

exports.serverRender = serverRenderFactory<AdditionalData>(getRenderPromise, getAdditionalProviders);