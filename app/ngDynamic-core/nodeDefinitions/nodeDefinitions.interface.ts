import {Injector} from "@angular/core";

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
export interface NodeDefinition
{
    /**
     * Destroys everything that should be destroyed and frees memory
     */
    destroy(): void;
}