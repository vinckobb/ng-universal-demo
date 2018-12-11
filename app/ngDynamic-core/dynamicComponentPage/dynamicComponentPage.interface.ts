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

/**
 * Represents remote dynamic content response
 */
export interface RemoteDynamicContentResponse
{
    /**
     * Metadata for layout out dynamic content serialized
     */
    layout?: string;

    /**
     * Metadata for setting up connections between dynamic content serialized
     */
    relations?: string;
}