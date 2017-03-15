import './dependencies';
import 'zone.js/dist/zone-node';
import { platformServer, renderModule } from '@angular/platform-server';
import { ServerAppModule } from './app/server-app.module';
import { enableProdMode } from '@angular/core';
const fs = require('fs');
const path = require('path');
enableProdMode();

const templateCache  = {};

module.exports = function (filePath, url, callback)
{
    if(!templateCache[filePath])
    {
        let file = fs.readFileSync(filePath);
        templateCache[filePath] = file.toString();
    }

    renderModule(ServerAppModule, 
    {
        document: templateCache[filePath],
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
