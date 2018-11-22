import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef} from "@angular/core";
import {ComponentRoute} from "@ng/common";
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
@ComponentRoute({path: ':id'})
export class DesignerPageComponent implements OnInit, OnDestroy
{
    //######################### private fields #########################

    /**
     * Subscription for url changes
     */
    private _urlChangeSubscription: Subscription;

    private _mode: DesignerMode;

    //######################### public fields - template bindings #########################

    public designerModes = DesignerMode;

    //######################### constructor #########################
    constructor(private _changeDetector: ChangeDetectorRef)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit()
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

    public setMode(mode: DesignerMode)
    {
        this._mode = mode;

        this._changeDetector.detectChanges();
    }

    public isMode(mode: DesignerMode)
    {
        return this._mode == mode;
    }
}