import {Component} from '@angular/core';
import {ComponentRoute, ProgressIndicatorService, Utils} from '@ng/common';

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

    /**
     * Gets indication whether controls have error
     */
    public hasError = Utils.forms.hasError;
    
    /**
     * Gets indication whether hide validations or not for controls
     */
    public alertHidden = Utils.forms.alertHidden;

    //######################### constructors #########################
    constructor(private progressSvc: ProgressIndicatorService)
    {
    }

    //######################### public methods #########################
    public showProgress()
    {
        this.progressSvc.showProgress();

        setTimeout(() =>
        {
            this.progressSvc.hideProgress();
        }, 5000);
    }
}