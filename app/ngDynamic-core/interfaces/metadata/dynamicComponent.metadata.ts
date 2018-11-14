/**
 * Metadata used for rendering dynamic components
 */
export interface DynamicComponentMetadata<TOptions>
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
    options: TOptions;
}

/**
 * Metadata containing instance of dynamic component
 */
export interface DynamicComponentMetadataInstance<TComponent, TOptions> extends DynamicComponentMetadata<TOptions>
{
    /**
     * Instance of created component
     */
    instance: TComponent;
}