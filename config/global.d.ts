declare module "config/global"
{
    var _tmp:
    {
        /**
         * Indication that application is running in debug mode
         */
        debug: boolean;
        
        /**
         * Indication whether enable server logging of js errors
         */
        serverLogging: boolean;
        
        /**
         * Version of current running application
         */
        version: string;
        
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

declare var preboot;
declare var isProduction: boolean;