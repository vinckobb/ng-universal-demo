import {DynamicNode} from "../dynamicNode";

/**
 * Description of dynamic component
 */
export interface DynamicComponent<TOptions> extends DynamicNode
{
    /**
     * Options used for rendering this component
     */
    options: TOptions;
}