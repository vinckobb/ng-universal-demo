import {Component, HostBinding} from '@angular/core';
import {ComponentRoute, StatusCodeService} from '@ng/common';
import {FlyInOutAnimation} from '@ng/animations';
import {BaseAnimatedComponent} from "../../misc/baseAnimatedComponent";

/**
 * Component used for displaying access denied page
 */
@Component(
{
    selector: 'access-denied-view',
    templateUrl: "accessDenied.component.html",
    animations: [FlyInOutAnimation]
})
@ComponentRoute({path:'accessDenied'})
export class AccessDeniedComponent extends BaseAnimatedComponent
{
    //######################### constructor #########################
    constructor(statusCodeService: StatusCodeService)
    {
        super();

        statusCodeService.setStatusCode(403);
    }
}