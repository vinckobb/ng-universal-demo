import {Injector} from "@angular/core";

import {DynamicNode} from "../interfaces";

/**
 * Definition of node constructor
 */
export interface NodeDefinitionConstructor
{
    new (injector: Injector): NodeDefinition;
}

/**
 * Definition of node instance
 */
export interface NodeDefinition extends DynamicNode
{
    /**
     * Destroys everything that should be destroyed and frees memory
     */
    destroy(): void;
}