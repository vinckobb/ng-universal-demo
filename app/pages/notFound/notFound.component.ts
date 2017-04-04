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
@ComponentRoute({path: '**'})
export class NotFoundComponent
{
    //######################### constructor #########################
    constructor(statusCodeService: StatusCodeService)
    {
        statusCodeService.setStatusCode(404);
    }
}