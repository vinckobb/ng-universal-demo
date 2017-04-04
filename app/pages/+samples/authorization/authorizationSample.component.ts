import {Component} from '@angular/core';
import {ComponentRoute} from '@ng/common';

@Component(
{
    selector: "authorization-sample",
    templateUrl: 'authorizationSample.component.html'
})
@ComponentRoute({path: 'authorization'})
export class AuthorizationSampleComponent
{
public static ngRoutes = [{path: 'authorization', component: AuthorizationSampleComponent}];
}