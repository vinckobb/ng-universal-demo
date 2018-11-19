import {DynamicComponentMetadata, DynamicComponentRelationMetadata} from "../interfaces";

/**
 * Represents dynamic content response
 */
export interface DynamicContentResponse
{
    /**
     * Metadata for layout out dynamic content
     */
    layout?: DynamicComponentMetadata;

    /**
     * Metadata for setting up connections between dynamic content
     */
    relations?: DynamicComponentRelationMetadata[];
}