import {Injectable, ComponentFactory, Injector, NgModuleFactory, Compiler, NgModuleRef, Type} from "@angular/core";
import {isString} from "@asseco/common";

import {DynamicComponentMetadata} from "../interfaces/metadata/dynamicComponent.metadata";

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
        let npmPackage = await import(`@ngDynamic/${componentMetadata.componentPackage}/dynamicPackage`)
            .catch(error =>
            {
                throw new Error(`Unable to obtain '${componentMetadata.componentPackage}' component\`s package, error '${error}'.`);
            });

        if(!npmPackage)
        {
            return null;
        }

        let moduleFactory: NgModuleFactory<any>;

        //gets module factory
        if(`${componentMetadata.componentModule}NgFactory` in npmPackage)
        {
            moduleFactory = npmPackage[`${componentMetadata.componentModule}NgFactory`];
        }

        //not aot build
        if(!isAot && componentMetadata.componentModule in npmPackage)
        {
            let compiler: Compiler = this._injector.get(Compiler);
            moduleFactory = compiler.compileModuleSync(npmPackage[componentMetadata.componentModule]);
        }

        //module not found
        if(!moduleFactory)
        {
            throw new Error(`Unable to obtain '${componentMetadata.componentModule}' component\`s module!`);
        }

        if(!(componentMetadata.componentName in npmPackage))
        {
            throw new Error(`Unable to obtain '${componentMetadata.componentName}' component!`);
        }

        let parentModule = parentInjector.get(NgModuleRef);
        let moduleRef = moduleFactory.create(parentModule.injector);
        let componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(npmPackage[componentMetadata.componentName] as Type<TComponent>);

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

        if(!componentMetadata.componentModule || !isString(componentMetadata.componentModule))
        {
            throw new Error(`Component\`s module '${componentMetadata.id}' is not string!`);
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