import {DynamicComponentMetadata} from "../../../../ngDynamic-core";

/**
 * Stack component options
 */
export interface StackComponentOptions
{
    /**
     * Indication whether inline stacked elements
     */
    inline?: boolean;

    /**
     * Array of children that are going to be rendered
     */
    children?: DynamicComponentMetadata<any>[];
}