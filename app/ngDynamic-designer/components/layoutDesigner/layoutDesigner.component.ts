import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, ViewChildren, QueryList, Input} from "@angular/core";
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

    //######################### public properties - inputs #########################

    /**
     * Packages that should be available in component palette
     */
    @Input()
    public packageNames: string[];

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
        let designerMetadata = await this._packageLoader.getComponentsMetadata('layout', 'stack');
        designerMetadata.layoutMetadata.value = 
        {
            'padding.left': 50,
            'padding.top': 25,
            'inline': false
        };
        this.metadata =
        {
            packageName: 'layout',
            componentName: 'stack',
            designerMetadata: designerMetadata,
            componentMetadata: 
            {
                id: "nieco",
                componentPackage: 'layout',
                componentName: 'stack',
                options:
                {
                    children:
                    [
                        {
                            id: 'nieco ine',
                            componentPackage: 'layout',
                            componentName: 'block',
                            options:
                            {}
                        },
                        {
                            id: 'nieco ine 2',
                            componentPackage: 'layout',
                            componentName: 'block',
                            options:
                            {}
                        }
                    ]
                }
            }
        };

        this._changeDetector.detectChanges();

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