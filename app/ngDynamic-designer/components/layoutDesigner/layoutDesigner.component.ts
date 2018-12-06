import {Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, ViewChildren, QueryList, Input} from "@angular/core";

import {PackageLoader} from "../../packageLoader";
import {DesignerComponentRendererDirective} from "../../directives";
import {DesignerLayoutPlaceholderComponent, DesignerLayoutComponentRendererData} from "../../interfaces";

/**
 * Component used for displaying layout designer
 */
@Component(
{
    selector: 'layout-designer',
    templateUrl: 'layoutDesigner.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutDesignerComponent implements OnInit
{
    //######################### public properties #########################

    /**
     * Root component for this page component tree
     */
    public get rootComponent(): DesignerLayoutPlaceholderComponent
    {
        if(!this.ɵChildren || !this.ɵChildren.first || !this.ɵChildren.first.component)
        {
            return null;
        }

        return this.ɵChildren.first.component;
    }

    //######################### public properties - template bindings #########################

    /**
     * TODO ukazka len
     */
    public metadata: DesignerLayoutComponentRendererData;

    //######################### public properties - inputs #########################

    /**
     * Packages that should be available in component palette
     */
    @Input()
    public packageNames: string[];

    //######################### public properties - children #########################

    /**
     * Array of children renderers
     */
    @ViewChildren('layoutComponents')
    public ɵChildren: QueryList<DesignerComponentRendererDirective<DesignerLayoutPlaceholderComponent>>;

    //######################### constructor #########################
    constructor(private _packageLoader: PackageLoader,
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
    }
}