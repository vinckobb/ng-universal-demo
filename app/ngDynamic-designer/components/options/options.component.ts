import {Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

import {OptionsService} from "../../services";
import {LayoutMetadata, OptionType} from "../../interfaces";

/**
 * Component used for rendering and editing components options
 */
@Component(
{
    selector: 'options',
    templateUrl: 'options.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsComponent implements OnDestroy
{
    //######################### private fields #########################

    /**
     * Subscription for changes of options
     */
    private _optionsChangeSubscription: Subscription;

    /**
     * Subscription for changes of id value
     */
    private _idValueChangeSubscription: Subscription;

    /**
     * Subscription for changes of options value
     */
    private _optionsValueChangeSubscription: Subscription;

    /**
     * Currently loaded and displayed layout metadata
     */
    private _layoutMetadata: LayoutMetadata;

    /**
     * Indicates whether options are being loaded
     */
    private _isLoadingOptions: boolean;

    //######################### public properties - template bindings #########################

    /**
     * Control used for editing id of component
     */
    public idControl: FormControl;

    /**
     * Control used for editing options of component
     */
    public optionsForm: FormGroup;

    /**
     * OptionType enum
     */
    public optionTypes = OptionType;

    /**
     * Returns layout metadata of component
     */
    public get layoutMetadata(): LayoutMetadata
    {
        return this._layoutMetadata;
    }

    //######################### constructor #########################
    constructor(private _optionsSvc: OptionsService,
                private _changeDetector: ChangeDetectorRef)
    {
        this.idControl = new FormControl(null, [Validators.required]);
        this.optionsForm = new FormGroup({});

        this._idValueChangeSubscription = this.idControl.valueChanges.subscribe(value =>
        {
            if(this._layoutMetadata)
            {
                this._layoutMetadata.id = value;
                this._layoutMetadata.optionsComponent.invalidateVisuals("id");
            }
        });

        this._optionsValueChangeSubscription = this.optionsForm.valueChanges.subscribe(options =>
        {
            if (this._isLoadingOptions)
            {
                return;
            }

            this._layoutMetadata.value = options;
            this._layoutMetadata.optionsComponent.invalidateVisuals("options");
        });

        this._optionsChangeSubscription = this._optionsSvc.loadProperties.subscribe(options =>
        {
            this._layoutMetadata = options;
            this._loadOptions();
            
            this._changeDetector.detectChanges();
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._optionsChangeSubscription)
        {
            this._optionsChangeSubscription.unsubscribe();
            this._optionsChangeSubscription = null;
        }

        if(this._idValueChangeSubscription)
        {
            this._idValueChangeSubscription.unsubscribe();
            this._idValueChangeSubscription = null;
        }

        if(this._optionsValueChangeSubscription)
        {
            this._optionsValueChangeSubscription.unsubscribe();
            this._optionsValueChangeSubscription = null;
        }
    }

    //######################### private methods #########################

    /**
     * Loads options and creates form
     */
    private _loadOptions()
    {
        this._isLoadingOptions = true;
        
        //clear all previous controls
        if(this.optionsForm.controls)
        {
            Object.keys(this.optionsForm.controls).forEach(controlName =>
            {
                this.optionsForm.removeControl(controlName);
            });
        }

        if(this._layoutMetadata && this._layoutMetadata.options && this._layoutMetadata.options.length)
        {
            this._layoutMetadata.options.forEach(option =>
            {
                //TODO - add collection controlos (FormArray)

                this.optionsForm.addControl(option.id, new FormControl(option.defaultValue, option.validators || []));
            });

            if (this._layoutMetadata.value)
            {
                this.optionsForm.patchValue(this._layoutMetadata.value, {emitEvent: false});
            }
        }
        
        this._isLoadingOptions = false;
    }
}