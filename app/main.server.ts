import './dependencies';
import 'zone.js/dist/zone-node';
import { platformServer, renderModule } from '@angular/platform-server';
import { ServerAppModule } from './app/server-app.module';
import { enableProdMode } from '@angular/core';

enableProdMode();

function serverRender(index, url, callback)
{
    renderModule(ServerAppModule, 
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