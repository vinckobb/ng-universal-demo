import {DynamicContentMetadata, RemoteDynamicContentMetadata} from "../../ngDynamic-core";
import {NodeDesignerNodeState} from "./nodeDesigner/nodeDesigner.interface";

/**
 * Available modes of designer
 */
export enum DesignerMode
{
    LAYOUT = 'LAYOUT',
    NODE = 'NODE',
    CODE = 'CODE'
}

/**
 * Represents current designer state
 */
export interface DesignerState
{
    /**
     * Metadata used for rendering this dynamic content
     */
    metadata?: DynamicContentMetadata;

    /**
     * Metadata for designer for recreation current state
     */
    designerMetadata?:
    {
        nodeDesignerMetadata?: NodeDesignerNodeState[];
    };
}

/**
 * Represents remote designer state
 */
export interface RemoteDesignerState
{
    /**
     * Metadata used for rendering this dynamic content
     */
    metadata?: RemoteDynamicContentMetadata;

    /**
     * Metadata for designer for recreation current state
     */
    designerMetadata?:
    {
        nodeDesignerMetadata?: string;
    };
}