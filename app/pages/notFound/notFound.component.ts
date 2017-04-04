import {Component} from '@angular/core';
import {ComponentRoute, StatusCodeService} from '@ng/common';

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