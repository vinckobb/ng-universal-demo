declare module "config/global"
{
    var _tmp:
    {
        /**
         * Indication that application is running in debug mode
         */
        debug: boolean;
        
        /**
         * Base url that is used for accessing REST api
         */
        apiBaseUrl: string;
        
        /**
         * Object hodling default headers that are send with rest requests
         */
        defaultApiHeaders: { [key: string]: string };
        
        /**
         * Default application language
         */
        defaultLanguage: string;
        
        /**
         * Default number of items per page when using paging
         */
        defaultItemsPerPage: number;
        
        /**
         * Default number of page when used paging
         */
        defaultPage: number;

        /**
         * Visual theme for UI themed pages
         */
        theme: string;
        
        /**
         * Available languages in application
         */
        availaleLanguages: [{lang: string; title: string;}];
    };

    export = _tmp;
}

declare module "config/version"
{
    var _tmp:
    {
        /**
         * Version of current running application
         */
        version: string;
    };

    export = _tmp;
}

declare namespace Positions 
{
    /**
     * Coordinates for positioning target
     */
    export interface PositionsCss
    {
        /**
         * Top css property
         */
        top?: number;

        /**
         * Left css property
         */
        left?: number;
    }

    /**
     * Posible coordinates
     */
    export type PositionsCoordinates = 'top left'|'top center'|'top right'|'center left'|'center center'|'center right'|'bottom left'|'bottom center'|'bottom right';

    /**
     * Description of position function
     */
    export interface PositionsFunc
    {
        /**
         * Computes positions for element relative to target
         * @param element Element that will be positioned
         * @param elementCoordinates Relative coordinates of element
         * @param target Target element which will be element positioned against
         * @param targetCoordinates Relative coordinates of target element
         */
        (element: HTMLElement, elementCoordinates: PositionsCoordinates, target: HTMLElement, targetCoordinates: PositionsCoordinates): PositionsCss;
    }
}

declare module "positions"
{
    var _tmp: Positions.PositionsFunc;

    export = _tmp;
}

declare var isProduction: boolean;
declare var isNgsw: boolean;