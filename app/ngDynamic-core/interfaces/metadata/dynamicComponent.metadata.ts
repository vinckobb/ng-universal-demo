/**
 * Metadata used for rendering dynamic components
 */
export interface DynamicComponentMetadata
{
    /**
     * Unique id identifying component in current view
     */
    id: string;

    /**
     * Name of npm package storing component
     */
    componentPackage: string;

    /**
     * Name of component to be displayed
     */
    componentName: string;

    /**
     * Options passed to component
     */
    options: any;
}

/**
 * Metadata containing instance of dynamic component
 */
export interface DynamicComponentMetadataInstance<TComponent> extends DynamicComponentMetadata
{
    /**
     * Instance of created component
     */
    instance: TComponent;
}