import {Coordinates} from "../../interfaces";

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
