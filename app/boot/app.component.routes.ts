import {RouterModule} from '@angular/router';
import {Utils} from '@ng/common';

import {HomeComponent} from '../pages/home/home.component';
import {AccessDeniedComponent} from "../pages/accessDenied/accessDenied.component";
import {ForbiddenComponent} from "../pages/forbidden/forbidden.component";
import {NotFoundComponent} from "app/pages/notFound/notFound.component";

var componentRoutes = Utils.routerHelper.extractRoutes([HomeComponent,
                                                        AccessDeniedComponent,
                                                        ForbiddenComponent,
                                                        NotFoundComponent]);

var routes = 
[
    { 
        path: 'samples', 
        loadChildren: '../pages/+samples/samples.module#SamplesModule'
    },
    ...componentRoutes
];

export var appRoutesModule = RouterModule.forRoot(routes, {enableTracing: false});
export var appComponents = [HomeComponent,
                            AccessDeniedComponent,
                            ForbiddenComponent,
                            NotFoundComponent];
