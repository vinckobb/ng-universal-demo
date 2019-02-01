import {Component, ChangeDetectionStrategy, ChangeDetectorRef, SkipSelf, Inject} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";

import {DynamicComponentGeneric} from "../../../../ngDynamic-core";
import {InputComponentOptions} from "./input.interface";
import {FORM_COMPONENT, FormComponentApi} from "../../form/component";

/**
 * Form input component used for rendering input
 */
@Component(
{
    selector: 'form-input-component',
    templateUrl: 'input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements DynamicComponentGeneric<InputComponentOptions>
{
    //######################### private fields #########################

    /**
     * Form control that represents this input
     */
    private _formControl: FormControl;

    //######################### public properties #########################

    /**
     * Options used for rendering this component
     */
    public options: InputComponentOptions;

    //######################### constructor #########################
    constructor(formBuilder: FormBuilder,
                private _changeDetector: ChangeDetectorRef,
                @SkipSelf() @Inject(FORM_COMPONENT) private _parentForm: FormComponentApi)
    {
        this._formControl = formBuilder.control(null);

        console.log(this._parentForm, this._formControl);
    }

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }
}