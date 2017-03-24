import './hacks';
import './dependencies';
import 'zone.js/dist/zone-node';
import {enableProdMode} from '@angular/core';
import {platformServer, renderModuleFactory} from '@angular/platform-server';
import {ServerAppModuleNgFactory} from './ngfactory/app.aot/boot/server-app.module.ngfactory';
import {serverRenderFactory} from "@ng/server-stuff";
import {AdditionalData, getAdditionalProviders} from './server.providers';

enableProdMode();

exports.serverRender = serverRenderFactory<AdditionalData>(true, ServerAppModuleNgFactory, getAdditionalProviders);
