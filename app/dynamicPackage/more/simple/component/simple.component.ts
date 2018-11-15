import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";
import {Subscription} from "rxjs";

import {DynamicComponent, DynamicOutput} from "../../../../ngDynamic-core";

/**
 * Simple component
 */
@Component(
{
    selector: 'simple-component',
    templateUrl: 'simple.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleComponent implements DynamicComponent<string>
{
    //######################### private fields #########################

    /**
     * Subscription for changes in output control
     */
    private _outputChangeSubscription: Subscription;

    //######################### public properties - inputs #########################

    /**
     * Simple input property
     */
    public simpleInput: string;

    //######################### public properties - outputs #########################

    /**
     * Simple output property
     */
    @DynamicOutput()
    public simpleOutput: string = 'default';

    //######################### public properties #########################

    /**
     * Options used for rendering this component
     */
    public options: string = 'default';

    //######################### public properties - template bindings #########################

    /**
     * Output bound to control
     */
    public outputControl: FormControl;

    //######################### constructor #########################
    constructor(private _changeDetector: ChangeDetectorRef,
                formBuilder: FormBuilder)
    {
        this.outputControl = formBuilder.control(null);

        this._outputChangeSubscription = this.outputControl.valueChanges.subscribe((val) =>
        {
            this.simpleOutput = val;
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._outputChangeSubscription)
        {
            this._outputChangeSubscription.unsubscribe();
            this._outputChangeSubscription = null;
        }
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