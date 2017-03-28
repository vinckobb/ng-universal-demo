import {Component} from '@angular/core';
import {ComponentRoute} from '@ng/common';
import {FlyInOutAnimation} from '@ng/animations';
import {BaseAnimatedComponent} from "app/misc/baseAnimatedComponent";

/**
 * Component used for displaying access denied page
 */
@Component(
{
    templateUrl: "accessDenied.component.html",
    animations: [FlyInOutAnimation]
})
@ComponentRoute({path:'accessDenied'})
export class AccessDeniedComponent extends BaseAnimatedComponent
{
}