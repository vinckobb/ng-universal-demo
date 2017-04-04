import {RouterModule} from '@angular/router';

import {HomeComponent} from '../pages/home/home.component';
import {AccessDeniedComponent} from "../pages/accessDenied/accessDenied.component";
import {ForbiddenComponent} from "../pages/forbidden/forbidden.component";

var componentRoutes = [...HomeComponent.ngRoutes,...AccessDeniedComponent.ngRoutes,...ForbiddenComponent.ngRoutes];

var routes = 
[
    ...componentRoutes
];

export var appRoutesModule = RouterModule.forRoot(routes, {enableTracing: false});
export var appComponents = [HomeComponent,
                            AccessDeniedComponent,
                            ForbiddenComponent];
