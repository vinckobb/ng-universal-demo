import {Component} from '@angular/core';

/**
 * Home page component
 */
@Component(
{
    templateUrl: "forbidden.component.html"
})
export class ForbiddenComponent
{
public static ngRoutes = [{path:'forbidden', component: ForbiddenComponent}];
}