import {RouterModule} from '@angular/router';
import {Utils} from '@ng/common';

import {HomeView} from '../pages/home/home-view.component';

var componentRoutes = Utils.routerHelper.extractRoutes([HomeView]);

var routes = 
[
    { 
        path: 'lazy', 
        loadChildren: '../pages/+lazy/lazy.module#LazyModule'
    },
    ...componentRoutes
];

export var appRoutesModule = RouterModule.forRoot(routes, {enableTracing: false});
export var appComponents = [HomeView];
