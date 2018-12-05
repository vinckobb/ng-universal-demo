import {InjectionToken} from "@angular/core";

import {Coordinates, PropertiesMetadata} from "../../interfaces";

/**
 * Constant represents name of invalidation for svg drop relation
 */
export const INVALIDATE_DROP: string = 'drop';

/**
 * Token used for obtaining node properties service
 */
export const NODE_PROPERTIES_SERVICE: InjectionToken<NodePropertiesService> = new InjectionToken<NodePropertiesService>('NODE_PROPERTIES_SERVICE');

/**
 * Represents state of single node
 */
export interface NodeDesignerNodeState
{
    /**
     * Id of node
     */
    id: string;

    /**
     * Coordinates of node
     */
    position?: Coordinates;

    /**
     * Indication whether is node component node
     */
    componentNode?: boolean;
}

/**
 * Node properties service description
 */
export interface NodePropertiesService
{
    /**
     * Shows properties by metadata in properties component
     * @param PropertiesMetadata Metadata that should be loaded into properties component
     */
    showProperties(PropertiesMetadata: PropertiesMetadata);
}
