/**
 * Each type of dynamic node should implement this
 */
export interface DynamicNode
{
    /**
     * Explicitly runs invalidation of content (change detection)
     */
    invalidateVisuals(): void;
}