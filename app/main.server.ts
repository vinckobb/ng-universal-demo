import './dependencies';
import 'zone.js/dist/zone-node';
import {enableProdMode} from '@angular/core';
import {platformServer, renderModule} from '@angular/platform-server';
import {ServerAppModule} from './boot/server-app.module';
import {serverRenderFactory} from "./serverRenderFactory";

enableProdMode();

exports.serverRender = serverRenderFactory(false, ServerAppModule);