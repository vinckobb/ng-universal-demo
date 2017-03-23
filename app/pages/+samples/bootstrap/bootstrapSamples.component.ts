import {Component} from '@angular/core';
import {ComponentRoute} from '@ng/common';

/**
 * Bootstrap samples component
 */
@Component(
{
    selector: "bootstrap-samples",
    templateUrl: "bootstrapSamples.component.html"
})
@ComponentRoute({path: 'bootstrap'})
export class BootstrapSamplesComponent
{
    //######################### public methods #########################

    //public x :moment.Moment;

    public confirm(data)
    {
        alert(`ok confirmed ${data}`);
    }

    public cancel(data)
    {
        alert(`no canceled ${data}`);
    }
}