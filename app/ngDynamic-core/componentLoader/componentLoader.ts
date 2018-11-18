import {Injectable, ComponentFactory, Injector, NgModuleRef, NgModuleFactory, Compiler} from "@angular/core";
import {isString} from "@asseco/common";

import {DynamicComponentMetadata} from "../interfaces";
import {DynamicModule} from "./componentLoader.interface";

declare var isAot: boolean;
declare var localPackage: string;
var localPackage = localPackage || null;

/**
 * Loader used for obtaining ComponentFactory from component`s metadata
 */
@Injectable({providedIn: 'root'})
export class ComponentLoader
{
    //######################### constructor #########################
    constructor(private _injector: Injector)
    {
    }

    //######################### public methods #########################

    /**
     * Resolves component factory from component metadata
     * @param componentMetadata Metadata that are going to be used for resolving component factory
     * @param parentInjector Injector from view parent
     */
    public async resolveComponentFactory<TComponent>(componentMetadata: DynamicComponentMetadata, parentInjector: Injector): Promise<{factory: ComponentFactory<TComponent>, module: NgModuleRef<any>}>
    {
        this._validate(componentMetadata);

        //loads npm package dynamicaly
        let npmPackage: DynamicModule<TComponent> = await import(`@ngDynamic/${componentMetadata.componentPackage}/${componentMetadata.componentName}/importIndex`)
            .catch(error =>
            {
                throw new Error(`Unable to obtain '${componentMetadata.componentPackage}' component\`s package, error '${error}'.`);
            });

        if(!npmPackage)
        {
            return null;
        }

        let moduleFactoryPromise = await npmPackage.moduleFactory;
        let moduleFactory: NgModuleFactory<any> = moduleFactoryPromise && moduleFactoryPromise.ngModuleFactory;

        //not aot build
        if(!isAot && !moduleFactory && npmPackage.module)
        {
            let compiler: Compiler = this._injector.get(Compiler);
            moduleFactory = compiler.compileModuleSync(npmPackage.module);
        }

        //module not found
        if(!moduleFactory)
        {
            throw new Error(`Unable to obtain component\`s module for '${componentMetadata.componentName}'!`);
        }

        if(!npmPackage.component)
        {
            throw new Error(`Unable to obtain '${componentMetadata.componentName}' component!`);
        }

        let parentModule = parentInjector.get(NgModuleRef);
        let moduleRef = moduleFactory.create(parentModule.injector);
        let componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(npmPackage.component);

        return {
            factory: componentFactory,
            module: moduleRef
        };
    }

    //######################### private methods #########################

    /**
     * Validates component`s metadata
     * @param componentMetadata Metadata to be validated
     */
    private _validate(componentMetadata: DynamicComponentMetadata)
    {
        if(!componentMetadata.id || !isString(componentMetadata.id))
        {
            throw new Error(`Component\`s id '${componentMetadata.id}' is not string!`);
        }

        if(!componentMetadata.componentName || !isString(componentMetadata.componentName))
        {
            throw new Error(`Component\`s name '${componentMetadata.id}' is not string!`);
        }

        if(!componentMetadata.componentPackage || !isString(componentMetadata.componentPackage))
        {
            throw new Error(`Component\`s package '${componentMetadata.id}' is not string!`);
        }
    }
}