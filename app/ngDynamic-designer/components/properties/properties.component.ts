import {Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

import {PropertiesService} from "../../services";
import {PropertiesMetadata, PropertyType} from "../../interfaces";

/**
 * Component used for rendering and editing dynamic node properties
 */
@Component(
{
    selector: 'properties',
    templateUrl: 'properties.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesComponent implements OnDestroy
{
    //######################### private fields #########################

    /**
     * Subscription for changes of properties
     */
    private _propertiesChangeSubscription: Subscription;

    /**
     * Subscription for changes of id value
     */
    private _idValueChangeSubscription: Subscription;

    /**
     * Subscription for changes of properties value
     */
    private _propertiesValueChangeSubscription: Subscription;

    /**
     * Currently loaded and displayed properties metadata
     */
    private _propertiesMetadata: PropertiesMetadata;

    /**
     * Indicates whether properties being loaded
     */
    private _isLoadingProperties: boolean;

    //######################### public properties - template bindings #########################

    /**
     * Control used for editing id of dynamic node
     */
    public idControl: FormControl;

    /**
     * Control used for editing properties of dynamic node
     */
    public propertiesForm: FormGroup;

    /**
     * PropertyType enum
     */
    public propertyTypes = PropertyType;

    /**
     * Returns properties metadata of dynamic node
     */
    public get propertiesMetadata(): PropertiesMetadata
    {
        return this._propertiesMetadata;
    }

    //######################### constructor #########################
    constructor(private _propertiesSvc: PropertiesService,
                private _changeDetector: ChangeDetectorRef)
    {
        this.idControl = new FormControl(null, [Validators.required]);
        this.propertiesForm = new FormGroup({});

        this._idValueChangeSubscription = this.idControl.valueChanges.subscribe(value =>
        {
            if(this._propertiesMetadata)
            {
                this._propertiesMetadata.id = value;
                this._propertiesMetadata.dynamicNodeInstance.invalidateVisuals("id");
            }
        });

        this._propertiesValueChangeSubscription = this.propertiesForm.valueChanges.subscribe(propertiesValue =>
        {
            if (this._isLoadingProperties)
            {
                return;
            }

            this._propertiesMetadata.value = propertiesValue;
            this._propertiesMetadata.dynamicNodeInstance.invalidateVisuals("properties");
        });

        this._propertiesChangeSubscription = this._propertiesSvc.loadProperties.subscribe(properties =>
        {
            this._propertiesMetadata = properties;
            this._loadProperties();
            
            this._changeDetector.detectChanges();
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._propertiesChangeSubscription)
        {
            this._propertiesChangeSubscription.unsubscribe();
            this._propertiesChangeSubscription = null;
        }

        if(this._idValueChangeSubscription)
        {
            this._idValueChangeSubscription.unsubscribe();
            this._idValueChangeSubscription = null;
        }

        if(this._propertiesValueChangeSubscription)
        {
            this._propertiesValueChangeSubscription.unsubscribe();
            this._propertiesValueChangeSubscription = null;
        }
    }

    //######################### private methods #########################

    /**
     * Loads properties and creates form
     */
    private _loadProperties()
    {
        this._isLoadingProperties = true;
        
        //clear all previous controls
        if(this.propertiesForm.controls)
        {
            Object.keys(this.propertiesForm.controls).forEach(controlName =>
            {
                this.propertiesForm.removeControl(controlName);
            });
        }

        if(this._propertiesMetadata && this._propertiesMetadata.properties && this._propertiesMetadata.properties.length)
        {
            this._propertiesMetadata.properties.forEach(property =>
            {
                //TODO - add collection controlos (FormArray)

                this.propertiesForm.addControl(property.id, new FormControl(property.defaultValue, property.validators || []));
            });

            if (this._propertiesMetadata.value)
            {
                this.propertiesForm.patchValue(this._propertiesMetadata.value, {emitEvent: false});
            }
        }
        
        this._isLoadingProperties = false;
    }
}