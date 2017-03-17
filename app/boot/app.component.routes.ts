import {RouterModule} from '@angular/router';
import {Utils} from '@ng/common';

import {HomeView} from '../pages/home/home-view.component';

var componentRoutes = Utils.routerHelper.extractRoutes([HomeView]);

var routes = 
[
    { 
        path: 'samples', 
        loadChildren: '../pages/+samples/samples.module#SamplesModule'
    },
    ...componentRoutes
];

export var appRoutesModule = RouterModule.forRoot(routes, {enableTracing: false});
export var appComponents = [HomeView];
