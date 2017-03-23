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
    //######################### public properties #########################
    public date: moment.Moment = null;
    public select: string;
    public selectValues = [{key: 1, value: "prva"}, {key: 2, value: "druha"}, {key: 3, value: "tretia"}];

    //######################### public methods #########################

    public confirm(data)
    {
        alert(`ok confirmed ${data}`);
    }

    public cancel(data)
    {
        alert(`no canceled ${data}`);
    }
}