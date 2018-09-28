import {EventEmitter, Inject, OnDestroy, Injectable, ElementRef, Optional} from "@angular/core";
import {Utils} from "@ng/common";
import {Subscription} from "rxjs";
import {MetadataSelector, DataLoader, DataResponse, ContentRendererOptions, ContentRendererPlugins, ContentRenderer, GridPluginGeneric, GRID_PLUGIN_INSTANCES, GridPluginInstances, METADATA_SELECTOR, DATA_LOADER} from "@ng/grid";

/**
 * Abstract component for content renderers
 */
@Injectable()
export class SimpleContentRendererAbstractComponent<TOrdering, TData, TMetadata, TOptions extends ContentRendererOptions<any, ContentRendererPlugins>> implements ContentRenderer<TOrdering>, OnDestroy, GridPluginGeneric<TOptions>
{
    //######################### protected fields #########################

    /**
     * Options for content renderer
     */
    protected _options: TOptions;

    /**
     * Metadata selector currently used
     */
    protected _metadataSelector: MetadataSelector<TMetadata>;

    /**
     * Data loader currently used
     */
    protected _dataLoader: DataLoader<DataResponse<TData>>;

    /**
     * Subscription listening for metadata changes
     */
    protected _metadataChangedSubscription: Subscription;

    /**
     * Subscription listening for data changes
     */
    protected _dataChangedSubscription: Subscription;

    /**
     * Subscription listening for ordering changes
     */
    protected _orderingChangedSubscription: Subscription;

    //######################### public properties - implementation of TableContentRenderer #########################

    /**
     * Options for content renderer
     */
    public set options(options: TOptions)
    {
        this._options = Utils.common.extend(true, this._options, options) as TOptions;
    }
    public get options(): TOptions
    {
        return this._options;
    }

    /**
     * Information about current ordering state
     */
    public get ordering(): TOrdering
    {
        //TODO
        return null;
    }
    public set ordering(ordering: TOrdering)
    {
        //TODO set ordering
        this.invalidateVisuals();
    }

    /**
     * Indication that ordering has changed
     */
    public orderingChange: EventEmitter<void> = new EventEmitter<void>();

    public data: TData[] = [];

    public metadata: TMetadata;

    //######################### constructor #########################
    constructor(public pluginElement: ElementRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() public gridPlugins: GridPluginInstances)
    {
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._metadataChangedSubscription)
        {
            this._metadataChangedSubscription.unsubscribe();
            this._metadataChangedSubscription = null;
        }

        if(this._orderingChangedSubscription)
        {
            this._orderingChangedSubscription.unsubscribe();
            this._orderingChangedSubscription = null;
        }

        if(this._dataChangedSubscription)
        {
            this._dataChangedSubscription.unsubscribe();
            this._dataChangedSubscription = null;
        }
    }

    //######################### public methods - implementation of TableContentRenderer #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this._invalidateVisuals();
    }

    /**
     * Initialize plugin, to be ready to use, initialize communication with other plugins
     */
    public initialize()
    {
        let metadataSelector: MetadataSelector<TMetadata> = this.gridPlugins[METADATA_SELECTOR] as MetadataSelector<TMetadata>;

        if(this._metadataSelector && this._metadataSelector != metadataSelector)
        {
            this._metadataChangedSubscription.unsubscribe();
            this._metadataChangedSubscription = null;
            this._metadataSelector = null;
        }

        if(!this._metadataSelector)
        {
            this._metadataSelector = metadataSelector;

            this._metadataChangedSubscription = this._metadataSelector.metadataChange.subscribe(() => this.invalidateVisuals());
        }

        let dataLoader: DataLoader<DataResponse<TData>> = this.gridPlugins[DATA_LOADER] as DataLoader<DataResponse<TData>>;

        if(this._dataLoader && this._dataLoader != dataLoader)
        {
            this._dataChangedSubscription.unsubscribe();
            this._dataChangedSubscription = null;
            this._dataLoader = null;
        }

        if(!this._dataLoader)
        {
            this._dataLoader = dataLoader;

            this._dataChangedSubscription = this._dataLoader.resultChange.subscribe(() => this.invalidateVisuals());
        }

        this.invalidateVisuals();
    }

    /**
     * Initialize plugin options, all operations required to be done with plugin options are handled here
     */
    public initOptions()
    {
        if(this._options.plugins)
        {
            //TODO do stuff
        }
    }

    //######################### public methods - template bindings #########################

    //######################### protected methods #########################

    /**
     * Invalidates visuals, redraw template
     */
    protected _invalidateVisuals()
    {
        if(this.data != this._dataLoader.result.data || this.metadata != this._metadataSelector.metadata)
        {
            this.data = this._dataLoader.result.data;
            this.metadata = this._metadataSelector.metadata;
        }
    }
}
