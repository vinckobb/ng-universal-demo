import {Component} from '@angular/core';

/**
 * Page displayed when url was not found
 */
@Component(
{
    selector: 'not-found-view',
    templateUrl: 'notFound.component.html'
})
export class NotFoundComponent
{
    public static ngRoutes = [{path: '**', component: NotFoundComponent}];
}