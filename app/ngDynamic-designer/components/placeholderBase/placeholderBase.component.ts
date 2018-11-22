import {ChangeDetectorRef, ViewChildren, QueryList} from "@angular/core";

import {DesignerComponentRendererData, DesignerDynamicComponentGeneric, DesignerDynamicComponent, LayoutMetadata} from "../../interfaces";
import {DynamicComponentMetadataGeneric, DynamicComponentMetadata} from "../../../ngDynamic-core";
import {DesignerComponentRendererDirective} from "../../directives";
import {OptionsService} from "../../services";

/**
 * Base class for all placeholder components
 */
export abstract class PlaceholderBaseComponent<TOptions> implements DesignerDynamicComponentGeneric<TOptions>
{
    //######################### protected fields #########################

    /**
     * Indication whether this component can contain children (is container component)
     */
    protected _isContainer: boolean = false;

    /**
     * Metadata for current component
     */
    protected _metadata: DynamicComponentMetadataGeneric<TOptions>;

    //######################### public properties - template bindings #########################

    /**
     * Data for rendering children designer components
     */
    public ɵChildrenData: DesignerComponentRendererData[] = [];

    //######################### public properties - children #########################

    /**
     * View children renderers
     */
    @ViewChildren('layoutComponents')
    public ɵChildren: QueryList<DesignerComponentRendererDirective<DesignerDynamicComponent>>;

    //######################### public properties #########################

    /**
     * Options used for rendering this component
     */
    public options: LayoutMetadata;

    /**
     * Layout metadata that will be used for rendering
     */
    public abstract get metadata(): DynamicComponentMetadataGeneric<TOptions>;

    /**
     * Array of child components
     */
    public get children(): DesignerDynamicComponent[]
    {
        if(this._isContainer)
        {
            let children = (this.ɵChildren && this.ɵChildren.toArray()) || [];

            return children.map(child => child.component);
        }

        return null;
    }

    //######################### constructor #########################
    constructor(protected _changeDetector: ChangeDetectorRef,
                protected _optionsSvc: OptionsService)
    {
    }

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }

    /**
     * Sets metadata for designer component
     * @param metadata Metadata to be set for designer component
     */
    public setMetadata(metadata: DynamicComponentMetadata)
    {
        this._metadata = metadata;
    }

    //######################### protected methods #########################

    /**
     * Adds child metadata used for rendering
     * @param data Data used for rendering designer component
     */
    protected addChildMetadata(data: DesignerComponentRendererData)
    {
        this.ɵChildrenData.push(data);
    }

    /**
     * Shows properties in properties window
     */
    protected showProperties()
    {
        this.options.id = this._metadata.id;
        this.options.optionsComponent = this;
        this.options.value = this._transformOptionsToProperties();
        
        this._optionsSvc.showProperties(this.options);
    }

    //######################### private methods #########################

    /**
     * Transforms component options to properties options
     */
    private _transformOptionsToProperties()
    {
        let propertiesOptions = {};

        //TODO - add logic for collection types

        if(this.options && this.options.options && this.options.options.length)
        {
            this.options.options.forEach(option =>
            {
                propertiesOptions[option.id] = this.options.id.split('.').reduce((o,i)=>o[i], this.metadata.options);
            });
        }

        return propertiesOptions;
    }
}