import {Subscription} from "rxjs";

/**
 * Metadata for single component`s input
 */
export interface DynamicComponentRelationInputMetadata
{
    /**
     * Name of input be mapped
     */
    inputName?: string;

    /**
     * Id of node which contains this input
     */
    id?: string;
}

/**
 * Metadata for single component`s output
 */
export interface DynamicComponentRelationOutputMetadata
{
    /**
     * Name of output to be mapped
     */
    outputName?: string;

    /**
     * Inputs which are connected to this output
     */
    inputs?: DynamicComponentRelationInputMetadata[];
}

/**
 * Metadata for single component relations
 */
export interface DynamicComponentRelationMetadata
{
    /**
     * Unique id of component which outputs will be connected
     */
    id?: string;

    /**
     * Indication that relation is for component or non component node
     */
    isClassNode?: boolean;

    /**
     * Definition of all outputs and their connections
     */
    outputs?: DynamicComponentRelationOutputMetadata[];
}

/**
 * Metadata for single component`s output for relation manager
 */
export interface DynamicComponentRelationManagerInputOutputMetadata
{
    /**
     * Name of output to be mapped
     */
    outputName?: string;

    /**
     * Name of input be mapped
     */
    inputName?: string;

    /**
     * Id of node which contains this input
     */
    inputId?: string;

    /**
     * Id of output component which is attached to this input
     */
    outputNodeId?: string;

    /**
     * Instance of node containing this input
     */
    inputInstance?: any;
}

/**
 * Metadata for single component relations
 */
export interface DynamicComponentRelationManagerMetadata
{
    /**
     * Indication that relation is for component or non component node
     */
    isClassNode?: boolean;

    /**
     * Definition of all outputs and their connections to inputs
     */
    inputOutputs?: DynamicComponentRelationManagerInputOutputMetadata[];

    /**
     * Array of subscriptions for changes of outputs for component
     */
    outputsChangeSubscriptions?: Subscription[];
}