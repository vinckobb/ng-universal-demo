import {LayoutMetadata} from "../designer";
import {Observable, Subscription} from "rxjs";

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
 * Represents svg node 
 */
export interface SvgNodeDynamicNode extends SvgDynamicNode
{
    /**
     * Unique id of component which outputs will be connected
     */
    readonly id: string;

    /**
     * Name of node type, that should be constructed instead of component
     */
    readonly nodeType: string;

    /**
     * Options for node type
     */
    readonly nodeOptions: any;

    /**
     * Gets input coordinates of specified input
     * @param inputName Name of input which coordinates will be get
     */
    getInputCoordinates(inputName: string): Coordinates;

    /**
     * Gets output coordinates of specified output
     * @param outputName Name of output which coordinates will be get
     */
    getOutputCoordinates(outputName: string): Coordinates;

    /**
     * Adds relation to specified output
     * @param relation Relation to be added to specified output
     * @param outputName Output name which will register relation
     */
    addOutputRelation(relation: SvgRelationDynamicNode, outputName: string);

    /**
     * Adds relation to specified input
     * @param relation Relation to be added to specified input
     * @param inputName Input name which will register relation
     */
    addInputRelation(relation: SvgRelationDynamicNode, inputName: string): boolean;
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

    /**
     * Start coordinate of relation path
     */
    start: Coordinates;

    /**
     * End coordinate of relation path
     */
    end: Coordinates;

    /**
     * Subscription for start destroying of this relation
     */
    startDestroyingSubscription: Subscription;

    /**
     * Subscription for end destroying of this relation
     */
    endDestroyingSubscription: Subscription;

    /**
     * Information about connected peer at the end
     */
    endPeer: SvgPeerDropArea;
}

/**
 * Information about currenctly active drop peer
 */
export interface SvgPeerDropArea
{
    /**
     * Svg node that has active drop area
     */
    svgNode: SvgNodeDynamicNode;

    /**
     * Name of input which has active drop area
     */
    inputId: string;
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