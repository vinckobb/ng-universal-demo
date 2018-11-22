import {DynamicModule, DynamicComponent, DynamicComponentMetadata, DynamicComponentMetadataGeneric} from "../../ngDynamic-core";

/**
 * Metadata used for designer of dynamic component
 */
export interface ComponentDesignerMetadata
{
    /**
     * Javascript module containing dynamic component module definition
     */
    placeholderModule?: DynamicModule;

    /**
     * Metadata for relations (node designer)
     */
    relationsMetadata?: any;

    /**
     * Metadata for layout (layout designer)
     */
    layoutMetadata?: any;
}

/**
 * Static description of 
 */
export interface DesignerDynamicComponentClass
{
    /**
     * Metadata used for designer
     */
    ɵMetadata: ComponentDesignerMetadata;
}

/**
 * Description of dynamic component for designer
 */
export interface DesignerDynamicComponent extends DynamicComponent
{
    /**
     * Layout metadata that will be used for rendering
     */
    metadata: DynamicComponentMetadata;
}

/**
 * Description of dynamic component for designer
 */
export interface DesignerDynamicComponentGeneric<TOptions, TMetadataOptions> extends DesignerDynamicComponent
{
    /**
     * Options used for rendering this component
     */
    options: TOptions;

    /**
     * Layout metadata that will be used for rendering
     */
    metadata: DynamicComponentMetadataGeneric<TMetadataOptions>;
}

/**
 * Description of data passed to designer component renderer
 */
export interface DesignerComponentRendererData
{
    /**
     * Name of package that contains this component
     */
    packageName: string;

    /**
     * Name of component which placeholder is rendered
     */
    componentName: string;

    /**
     * Metadata for dynamic component designer
     */
    designerMetadata: ComponentDesignerMetadata;

    /**
     * Existing metadata for dynamic component (for rendering)
     */
    componentMetadata: DynamicComponentMetadata;
}