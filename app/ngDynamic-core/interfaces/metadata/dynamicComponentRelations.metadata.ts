/**
 * Metadata for single component`s input
 */
export interface DynamicComponentInputMetadata
{
    /**
     * Name of input be mapped
     */
    inputName?: string;

    /**
     * Id of node which contains this input
     */
    nodeId?: string;
}

/**
 * Metadata for single component`s output
 */
export interface DynamicComponentOutputMetadata
{
    /**
     * Name of output to be mapped
     */
    outputName?: string;

    /**
     * Inputs which are connected to this output
     */
    inputs?: DynamicComponentInputMetadata[];
}

/**
 * Metadata for single component relations
 */
export interface DynamicComponentRelationMetadata
{
    /**
     * Indication that relation is for component or non component node
     */
    isClassNode?: boolean;

    /**
     * Definition of all outputs and their connections
     */
    outputs: DynamicComponentOutputMetadata[];
}

/**
 * Metadata used for creating relations between dynamic components
 */
export interface DynamicComponentRelationsMetadata
{
    /**
     * Dictionary with components, or non component nodes which have connections
     */
    relations?: {[id: string]: DynamicComponentRelationMetadata};
}