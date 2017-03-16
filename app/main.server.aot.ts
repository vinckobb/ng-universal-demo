import './dependencies';
import 'zone.js/dist/zone-node';
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { ServerAppModuleNgFactory } from './ngfactory/app.aot/app/server-app.module.ngfactory';
import { enableProdMode } from '@angular/core';

enableProdMode();

function serverRender(index, url, callback)
{
    renderModuleFactory(ServerAppModuleNgFactory, 
    {
        document: index,
        url: url
    })
    .then(string => 
    {
        callback(null, string);
    })
    .catch(error =>
    {
        callback(error);
    });
}

exports.serverRender = serverRender;
