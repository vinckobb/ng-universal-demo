import {Component} from '@angular/core';
import {ComponentRoute} from '@ng/common';

@Component(
{
    selector: "common-samples",
    templateUrl: "commonSamples.component.html"
})
@ComponentRoute({path: 'common'})
export class CommonSamplesComponent
{
    //######################### public properties #########################
    public sampleNumber = 5235342.3231;
}