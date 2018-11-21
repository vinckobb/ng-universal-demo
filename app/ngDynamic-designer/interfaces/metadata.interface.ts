import {DynamicModule} from "../../ngDynamic-core";

/**
 * Metadata used for designer of dynamic content
 */
export interface DesignerMetadata
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
export interface DesignerDynamicComponent
{
    /**
     * Metadata used for designer
     */
    ɵMetadata: DesignerMetadata;
}