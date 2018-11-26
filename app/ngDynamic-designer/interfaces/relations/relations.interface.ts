import {LayoutMetadata} from "../designer";
import {Observable} from "rxjs";

import {DesignerMetadata} from "../metadata.interface";
import {DynamicNode} from "../../../ngDynamic-core";

/**
 * Metadata used for node relatiosn designer
 */
export interface RelationsMetadata extends DesignerMetadata
{
    /**
     * Array of inputs definitions
     */
    inputs?: InputOutputMetadata[];

    /**
     * Array of output definitions
     */
    outputs?: InputOutputMetadata[];


    dynamicInputs?: any;

    /**
     * Node options that can be changed
     */
    nodeOptions?: LayoutMetadata;

    /**
     * X coordinates of node
     */
    x?: number;

    /**
     * Y coordinates of node
     */
    y?: number;
}

/**
 * Definition of input or output node peer
 */
export interface InputOutputMetadata
{
    /**
     * Id of input or output used in metadata for identification
     */
    id?: string;

    /**
     * Name of peer in node designer
     */
    name?: string;

    /**
     * Data type of peer in node designer
     */
    type?: string;

    /**
     * Computed Y coordinate
     */
    y?: number;

    /**
     * Relations that are connected to this peer
     */
    relations?: SvgRelationDynamicNode[];
}

/**
 * Base for dynamic nodes in nodes designer
 */
export interface SvgDynamicNode extends DynamicNode
{
    /**
     * Method used for destroying this relation node
     */
    destroy(): void;
}

/**
 * Represents svg relations between two nodes
 */
export interface SvgRelationDynamicNode extends SvgDynamicNode
{
    /**
     * Occurs when this relations is being destroyed
     */
    readonly destroying: Observable<SvgRelationDynamicNode>;
}

/**
 * Coordinates of point in node designer
 */
export interface Coordinates
{
    /**
     * X coordinate of point
     */
    x?: number;

    /**
     * Y coordinate of point
     */
    y?: number;
}