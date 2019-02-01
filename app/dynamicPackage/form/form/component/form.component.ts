import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ExistingProvider, forwardRef, SkipSelf, Optional, Inject} from "@angular/core";
import {AbstractControl, FormGroup, FormBuilder} from "@angular/forms";

import {DynamicComponentGeneric} from "../../../../ngDynamic-core";
import {FormComponentOptions, FormComponentApi, FORM_COMPONENT} from "./form.interface";

/**
 * Form component used for grouping form inputs
 */
@Component(
{
    selector: 'form-component',
    templateUrl: 'form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers:
    [
        <ExistingProvider>
        {
            provide: FORM_COMPONENT,
            useExisting: forwardRef(() => FormComponent)
        }
    ]
})
export class FormComponent implements DynamicComponentGeneric<FormComponentOptions>, FormComponentApi
{
    //######################### private fields #########################

    /**
     * Form group that represents this form
     */
    private _formGroup: FormGroup;

    //######################### public properties #########################

    /**
     * Options used for rendering this component
     */
    public options: FormComponentOptions;

    //######################### constructor #########################
    constructor(formBuilder: FormBuilder,
                private _changeDetector: ChangeDetectorRef,
                @SkipSelf() @Optional() @Inject(FORM_COMPONENT) private _parentForm: FormComponentApi)
    {
        console.log(this._parentForm);

        this._formGroup = formBuilder.group({});
    }

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }

    /**
     * Registers provided control into the form
     * @param name Name of control to be registered
     * @param control Control to be registered within form
     */
    public registerControl(name: string, control: AbstractControl): void
    {
        this._formGroup.addControl(name, control);
    }

    /**
     * Unregisters provided control from form
     * @param name Name of control to be unregistered
     */
    public unregisterControl(name: string): void
    {
        this._formGroup.removeControl(name);
    }
}