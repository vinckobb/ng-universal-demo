import * as xhr2 from 'xhr2';

//HACK - enables setting cookie header
xhr2.prototype._restrictedHeaders.cookie = false;

import './hacks';
import './dependencies';
import 'form-data';
import 'zone.js/dist/zone-node';
import {enableProdMode} from '@angular/core';
import {ServerAppModuleNgFactory} from './ngfactory/app.aot/boot/server-app.module.ngfactory';
import {serverRenderFactory} from "@ng/server-stuff";
import {AdditionalData, getAdditionalProviders} from './server.providers';

enableProdMode();

exports.serverRender = serverRenderFactory<AdditionalData>(true, ServerAppModuleNgFactory, getAdditionalProviders);
