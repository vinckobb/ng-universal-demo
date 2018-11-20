import {Component, ChangeDetectionStrategy, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import { ComponentRoute } from "@ng/common";

/**
 * Component used for displaying layout designer
 */
@Component(
{
    selector: 'layout-designer-page',
    templateUrl: 'layoutDesignerPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'layout/:id'})
export class LayoutDesignerPageComponent implements OnInit, OnDestroy
{
    //######################### private fields #########################

    /**
     * Subscription for url changes
     */
    private _urlChangeSubscription: Subscription;

    //######################### public properties - template bindings #########################

    //######################### constructor #########################
    constructor(private _route: ActivatedRoute)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit()
    {
        this._urlChangeSubscription = this._route.url.subscribe(async urlChanges =>
        {
        });
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
}