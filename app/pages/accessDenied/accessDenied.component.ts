import {Component} from '@angular/core';
import {ComponentRoute} from '@ng/common';

/**
 * Component used for displaying access denied page
 */
@Component(
{
    templateUrl: "accessDenied.component.html"
})
@ComponentRoute({path:'accessDenied'})
export class AccessDeniedComponent
{
}