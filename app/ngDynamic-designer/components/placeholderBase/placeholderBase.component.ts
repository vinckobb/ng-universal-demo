import {ChangeDetectorRef, ViewChildren, QueryList, HostBinding, HostListener} from "@angular/core";
import {isPresent, generateId, setValue} from "@asseco/common";

import {DesignerLayoutComponentRendererData, DesignerLayoutPlaceholderComponentGeneric, DesignerLayoutPlaceholderComponent, LayoutMetadata} from "../../interfaces";
import {DynamicComponentMetadataGeneric, DynamicComponentMetadata} from "../../../ngDynamic-core";
import {DesignerComponentRendererDirective} from "../../directives";
import {PropertiesService} from "../../services";
import {PackageLoader} from "../../packageLoader";
import {transformOptionsToProperties} from "../../misc";

/**
 * Base class for all placeholder components
 */
export abstract class PlaceholderBaseComponent<TOptions> implements DesignerLayoutPlaceholderComponentGeneric<TOptions>
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

    //######################### public properties - host bindings #########################

    /**
     * Border style property
     */
    @HostBinding('style.border')
    public styleBorder: string = "2px dashed green";

    /**
     * Display style property
     */
    @HostBinding('style.display')
    public styleDisplay: string = "block";

    @HostListener('click', ['$event'])
    public onClick(event: MouseEvent)
    {
        event.stopPropagation();

        this.showProperties();
    }

    //######################### public properties - template bindings #########################

    /**
     * Data for rendering children designer components
     */
    public childrenData: DesignerLayoutComponentRendererData[] = [];

    //######################### public properties - children #########################

    /**
     * View children renderers
     */
    @ViewChildren('layoutComponents')
    public ɵChildren: QueryList<DesignerComponentRendererDirective<DesignerLayoutPlaceholderComponent>>;

    //######################### public properties #########################

    /**
     * Options used for rendering this component
     */
    public options: LayoutMetadata;

    /**
     * Id of components droplist
     */
    public dropzoneId: string;

    /**
     * Current id of component
     */
    public get id(): string
    {
        return this._metadata.id;
    }

    /**
     * Name of package owning this component
     */
    public get packageName(): string
    {
        return this._metadata.componentPackage;
    }

    /**
     * Name of component
     */
    public get componentName(): string
    {
        return this._metadata.componentName;
    }

    /**
     * Layout metadata that will be used for rendering
     */
    public abstract get metadata(): DynamicComponentMetadataGeneric<TOptions>;

    /**
     * Array of child components
     */
    public get children(): DesignerLayoutPlaceholderComponent[]
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
                protected _packageLoader: PackageLoader,
                protected _optionsSvc: PropertiesService)
    {
        this.dropzoneId = generateId(12);
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
    public async setMetadata(metadata: DynamicComponentMetadata): Promise<void>
    {
        this._metadata = metadata;
        this._updateOptions();
        await this.afterMetadataSet();
    }

    //######################### protected methods #########################

    /**
     * Adds child metadata used for rendering
     * @param data Data used for rendering designer component
     * @param index Index at which to add child
     */
    protected addChildMetadata(data: DesignerLayoutComponentRendererData, index?: number)
    {
        if (index == null)
        {
            this.childrenData.push(data);
            return;
        }
        
        this.childrenData.splice(index, 0, data);
    }

    /**
     * Adds child metadata used for rendering
     * @param data Data used for rendering designer component
     */
    protected async addChild(data: DynamicComponentMetadata)
    {
        let designerMetadata = await this._packageLoader.getComponentsMetadata(data.componentPackage, data.componentName);
        this.childrenData.push(
        {
            packageName: data.componentPackage,
            componentName: data.componentName,
            designerMetadata: designerMetadata,
            componentMetadata: data
        });
    }

    /**
     * Callback after metadata was set
     */
    protected afterMetadataSet(): Promise<void>
    {
        return Promise.resolve();
    };

    /**
     * Shows properties in properties window
     */
    protected showProperties()
    {
        this._updateOptions();
        
        this._optionsSvc.showProperties(this.options);
    }

    /**
     * Transforms properties used in designer into component options
     */
    protected transformPropertiesToOptions(): TOptions
    {
        let options = {} as TOptions;

        if(this.options && this.options.properties && this.options.properties.length)
        {
            this.options.properties.forEach(property =>
            {
                setValue(options, isPresent(this.options.value) && isPresent(this.options.value[property.id]) && this.options.value[property.id], property.id);
            });
        }

        return options;
    }

    //######################### private methods #########################

    /**
     * Updates options for this component
     */
    private _updateOptions()
    {
        this.options.id = this._metadata.id;
        this.options.dynamicNodeInstance = this;
        this.options.value = this.options.value || transformOptionsToProperties(this.options && this.options.properties, this._metadata.options);
    }
}