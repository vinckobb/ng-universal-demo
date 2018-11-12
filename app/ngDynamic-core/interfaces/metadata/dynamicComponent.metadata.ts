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
     * Name of module which holds declaration and export of component
     */
    componentModule: string;

    /**
     * Name of component to be displayed
     */
    componentName: string;

    /**
     * Options passed to component
     */
    options: any;
}