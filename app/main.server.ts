import './hacks';
import './dependencies';
import 'zone.js/dist/zone-node';
import {enableProdMode} from '@angular/core';
import {platformServer, renderModule} from '@angular/platform-server';
import {serverRenderFactory} from "@ng/server-stuff";
import {ServerAppModule} from './boot/server-app.module';
import {AdditionalData, getAdditionalProviders} from './server.providers';

enableProdMode();

exports.serverRender = serverRenderFactory<AdditionalData>(false, ServerAppModule, getAdditionalProviders);