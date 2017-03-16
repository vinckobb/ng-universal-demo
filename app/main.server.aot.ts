import './dependencies';
import 'zone.js/dist/zone-node';
import {enableProdMode} from '@angular/core';
import {platformServer, renderModuleFactory} from '@angular/platform-server';
import {ServerAppModuleNgFactory} from './ngfactory/app.aot/boot/server-app.module.ngfactory';
import {serverRenderFactory} from './serverRenderFactory';

enableProdMode();

exports.serverRender = serverRenderFactory(true, ServerAppModuleNgFactory);
