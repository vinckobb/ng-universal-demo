import {DynamicModule, DynamicComponent, DynamicComponentMetadata, DynamicComponentMetadataGeneric} from "../../ngDynamic-core";
import {LayoutMetadata} from "./layout";
import {RelationsMetadata} from "./relations";

/**
 * Common metadata used for designer of dynamic component or node
 */
export interface DesignerMetadata
{
    /**
     * Metadata for relations (node designer)
     */
    relationsMetadata?: RelationsMetadata;
}

/**
 * Metadata used for layout designer of dynamic component
 */
export interface DesignerLayoutMetadata extends DesignerMetadata
{
    /**
     * Javascript module containing dynamic component module definition
     */
    placeholderModule?: DynamicModule;

    /**
     * Metadata for layout (layout designer)
     */
    layoutMetadata?: LayoutMetadata;
}

/**
 * Metadata used for node designer of dynamic relation
 */
export interface DesignerNodeMetadata extends DesignerMetadata
{
}

/**
 * Static description of class containing metadata for designer
 */
export interface DesignerMetadataClass
{
    /**
     * Metadata used for designer
     */
    ɵMetadata: DesignerLayoutMetadata;
}

/**
 * Description of placeholder component for layout designer
 */
export interface DesignerLayoutPlaceholderComponent extends DynamicComponent
{
    /**
     * Layout metadata that will be used for rendering
     */
    readonly metadata: DynamicComponentMetadata;

    /**
     * Array of child components
     */
    readonly children: DesignerLayoutPlaceholderComponent[];

    /**
     * Current id of component
     */
    readonly id: string;

    /**
     * Id of components droplist
     */
    readonly dropzoneId: string;

    /**
     * Name of package owning this component
     */
    readonly packageName: string;

    /**
     * Name of component
     */
    readonly componentName: string;

    /**
     * Sets metadata for designer component
     * @param metadata Metadata to be set for designer component
     */
    setMetadata(metadata: DynamicComponentMetadata);
}

/**
 * Description of placeholder component for layout designer generic
 */
export interface DesignerLayoutPlaceholderComponentGeneric<TOptions> extends DesignerLayoutPlaceholderComponent
{
    /**
     * Options used for rendering this component
     */
    options: LayoutMetadata;

    /**
     * Layout metadata that will be used for rendering
     */
    readonly metadata: DynamicComponentMetadataGeneric<TOptions>;
}

/**
 * Description of data passed to designer component renderer
 */
export interface DesignerLayoutComponentRendererData extends DesignerItemId
{
    /**
     * Metadata for dynamic component designer
     */
    designerMetadata: DesignerLayoutMetadata;

    /**
     * Existing metadata for dynamic component (for rendering)
     */
    componentMetadata: DynamicComponentMetadata;
}

/**
 * Exact identification of item package name and component name
 */
export interface DesignerItemId
{
    /**
     * Name of package that contains this component
     */
    packageName: string;

    /**
     * Name of component to be rendered
     */
    componentName: string;
}

/**
 * Common metadata description for layout and node designer
 */
export interface DesignerCommonMetadata
{
    /**
     * Unique id of component or node instance in dynamic page
     */
    id?: string;

    /**
     * Name that is displayed for user for better identification of component or node type
     */
    name?: string;

    /**
     * Description of component or node type, can be longer
     */
    description?: string;
}