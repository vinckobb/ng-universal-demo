import {RouterModule} from '@angular/router';

import {HomeComponent} from '../pages/home/home.component';
import {AccessDeniedComponent} from "../pages/accessDenied/accessDenied.component";
import {NotFoundComponent} from "../pages/notFound/notFound.component";

var componentRoutes = [...HomeComponent.ngRoutes,...AccessDeniedComponent.ngRoutes,...NotFoundComponent.ngRoutes];

var routes = 
[
    ...componentRoutes
];

export var appRoutesModule = RouterModule.forRoot(routes, {enableTracing: false});
export var appComponents = [HomeComponent,
                            AccessDeniedComponent,
                            NotFoundComponent];
