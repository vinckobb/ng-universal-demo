import {Component} from '@angular/core';
import {ComponentRedirectRoute, ComponentRoute} from '@ng/common';

@Component(
{
    selector: "grid-sample",
    templateUrl: "gridSample.component.html"
})
@ComponentRedirectRoute('')
@ComponentRoute({path: 'grid'})
export class GridSampleComponent
{
}