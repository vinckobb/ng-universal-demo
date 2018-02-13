import {Component, ViewChild} from '@angular/core';
import {ComponentRedirectRoute, ComponentRoute, OrderByDirection, Paginator} from '@ng/common';
import {GridOptions, GridComponent, LoadMorePagingComponent} from '@ng/grid';
import {Authorize, AuthGuard} from '@ng/authentication';
import {flyInOutTrigger} from '@ng/animations';

import {GridDataService} from "../../../services/api/gridData/gridData.service";
import {BaseAnimatedComponent} from "../../../misc/baseAnimatedComponent";
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

/**
 * Grid samples component
 */
@Component(
{
    selector: "filter-sample",
    templateUrl: "filterSample.component.html",
    providers: [],
    animations: [flyInOutTrigger]
})
@ComponentRoute({path: 'sample'})
export class FilterSampleComponent extends BaseAnimatedComponent
{
    //######################### public properties #########################

    public form: FormGroup;

    //######################### constructor #########################
    constructor(private _fb: FormBuilder,
                private _activatedRoute: ActivatedRoute,
                private _router: Router)
    {
        super();

        this.form = this._fb.group(
            {
                name: '',
                surname: '',
                email: ''
            }
        );

        this._activatedRoute
            .queryParams
            .subscribe(params =>
            {
                this.form.patchValue(params);
            });
    }

    //######################### public methods #########################

    public submit()
    {
        //TODO save filter into url
        const urlTree = this._router.createUrlTree([], {
            queryParams: this.form.value,
            queryParamsHandling: "",
            preserveFragment: true });
        
          this._router.navigateByUrl(urlTree); 
    }

    //######################### private methods #########################
}