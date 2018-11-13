import {Type, NgModuleFactory} from "@angular/core";

/**
 * Ng module factory promise data
 */
export interface NgModuleFactoryPromise
{
    /**
     * Ng module factory
     */
    ngModuleFactory: NgModuleFactory<any>;
}

/**
 * Dynamic module description
 */
export interface DynamicModule<TComponent>
{
    /**
     * Dynamic component to be rendered
     */
    component: Type<TComponent>;

    /**
     * Dynamic component`s module
     */
    module: Type<any>;

    /**
     * Dynamic compnent`s module factory
     */
    moduleFactory: Promise<NgModuleFactoryPromise>;
}