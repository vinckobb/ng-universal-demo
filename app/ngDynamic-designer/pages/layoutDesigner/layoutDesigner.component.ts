import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, ViewChildren, QueryList, HostBinding} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

import {PackageLoader} from "../../packageLoader";
import {DesignerComponentRendererDirective} from "../../directives";
import {DesignerDynamicComponent, DesignerComponentRendererData} from "../../interfaces";

/**
 * Component used for displaying layout designer
 */
@Component(
{
    selector: 'layout-designer',
    templateUrl: 'layoutDesigner.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutDesignerComponent implements OnInit, OnDestroy
{
    //######################### private fields #########################

    /**
     * Subscription for url changes
     */
    private _urlChangeSubscription: Subscription;

    //######################### public properties - template bindings #########################

    /**
     * TODO ukazka len
     */
    public metadata: DesignerComponentRendererData;

    //######################### public properties - host bindings #########################

    @HostBinding('style.display')
    public componentStyleDisplay: string = "contents";

    //######################### public properties - children #########################

    @ViewChildren('layoutComponents')
    public children: QueryList<DesignerComponentRendererDirective<DesignerDynamicComponent>>;

    //######################### constructor #########################
    constructor(private _route: ActivatedRoute,
                private _packageLoader: PackageLoader,
                private _changeDetector: ChangeDetectorRef)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public async ngOnInit()
    {
        //TODO - toto je len ukazka treba to samozrejme urobit inak
        this.metadata =
        {
            packageName: 'layout',
            componentName: 'stack',
            componentMetadata: await this._packageLoader.getComponentsMetadata('layout', 'stack')
        };

        this._changeDetector.detectChanges();

        this._urlChangeSubscription = this._route.url.subscribe(async urlChanges =>
        {
        });
    }

    //######################### public methods - implementation of AfterViewInit #########################
    
    /**
     * Called when view was initialized
     */
    public ngAfterViewInit()
    {

        console.log(this.children.toArray());

        this.children.changes.subscribe(() =>
        {
            console.log('changed', this.children.toArray());
        });

        let first = this.children.first;

        if(first)
        {
            console.log(first.component);
        }
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

    public save()
    {
        let first = this.children.first;

        if(first)
        {
            console.log(first.component, first.component.metadata);
        }
    }
}