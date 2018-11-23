import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef} from "@angular/core";
import {Subscription} from "rxjs";

import {DesignerMode} from "./designer.interface";
import {ComponentsService, OptionsService} from "../services";

/**
 * Component used for displaying designer
 */
@Component(
{
    selector: 'dynamic-designer',
    templateUrl: 'designer.component.html',
    providers: 
    [
        ComponentsService,
        OptionsService
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignerPageComponent implements OnInit, OnDestroy
{
    //######################### private fields #########################

    /**
     * Subscription for url changes
     */
    private _urlChangeSubscription: Subscription;

    /**
     * Actual view mode for designer
     */
    private _mode: DesignerMode;

    //######################### public fields - template bindings #########################

    /**
     * Designer view modes enum
     */
    public designerModes = DesignerMode;

    /**
     * List of components packages that are available in designer
     */
    public designerPackageNames: string[] = ["layout"];

    //######################### constructor #########################
    constructor(private _changeDetector: ChangeDetectorRef)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public async ngOnInit()
    {
        this.setMode(DesignerMode.LAYOUT);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._urlChangeSubscription)
        {
            this._urlChangeSubscription.unsubscribe();
            this._urlChangeSubscription = null;
        }
    }

    //######################### public methods #########################

    /**
     * Sets view mode for designer
     * @param mode view mode
     */
    public setMode(mode: DesignerMode)
    {
        this._mode = mode;

        this._changeDetector.detectChanges();
    }

    /**
     * Checks if designer is in specific mode
     * @param mode view mode
     */
    public isMode(mode: DesignerMode)
    {
        return this._mode == mode;
    }
}