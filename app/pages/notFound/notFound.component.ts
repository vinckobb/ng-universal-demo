import {Component} from '@angular/core';
import {ComponentRoute, StatusCodeService} from '@ng/common';
import {FlyInOutAnimation} from '@ng/animations';
import {BaseAnimatedComponent} from "../../misc/baseAnimatedComponent";

/**
 * Page displayed when url was not found
 */
@Component(
{
    selector: 'not-found-view',
    templateUrl: 'notFound.component.html',
    animations: [FlyInOutAnimation]
})
@ComponentRoute({path: '**'})
export class NotFoundComponent extends BaseAnimatedComponent
{
    //######################### constructor #########################
    constructor(statusCodeService: StatusCodeService)
    {
        super();

        statusCodeService.setStatusCode(404);
    }
}