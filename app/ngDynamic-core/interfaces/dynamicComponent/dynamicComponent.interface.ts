
/**
 * Description of dynamic component
 */
export interface DynamicComponent<TOptions>
{
    /**
     * Options used for rendering this component
     */
    options: TOptions;

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    invalidateVisuals(): void;
}