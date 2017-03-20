import {Component} from '@angular/core';
import {ComponentRoute} from '@ng/common';
import {AuthGuard, Authorize} from '@ng/authentication';

/**
 * Home page component
 */
@Component(
{
    templateUrl: "forbidden.component.html"
})
@ComponentRoute({path:'forbidden', canActivate: [AuthGuard]})
@Authorize('forbiddenPage')
export class ForbiddenComponent
{
}