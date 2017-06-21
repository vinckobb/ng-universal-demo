import './dependencies';
import * as xhr2 from 'xhr2';

//HACK - enables setting cookie header
xhr2.prototype._restrictedHeaders.cookie = false;

import './hacks';
import 'form-data';
import 'zone.js/dist/zone-node';
import {enableProdMode} from '@angular/core';
import {serverRenderFactory} from "@ng/server-stuff";
import {ServerAppModule} from './boot/server-app.module';
import {AdditionalData, getAdditionalProviders} from './server.providers';

enableProdMode();

exports.serverRender = serverRenderFactory<AdditionalData>(false, ServerAppModule, getAdditionalProviders);