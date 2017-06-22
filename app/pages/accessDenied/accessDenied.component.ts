import {Component, HostBinding} from '@angular/core';

/**
 * Component used for displaying access denied page
 */
@Component(
{
    selector: 'access-denied-view',
    templateUrl: "accessDenied.component.html"
})
export class AccessDeniedComponent
{
public static ngRoutes = [{path:'accessDenied', component: AccessDeniedComponent}];
}