import {Injectable, ComponentFactory, Injector, NgModuleRef, NgModuleFactory, Compiler} from "@angular/core";
import {isString} from "@asseco/common";

import {DynamicComponentMetadata, DynamicComponent} from "../interfaces";
import {DynamicModule} from "./componentLoader.interface";

declare var isAot: boolean;
declare var localPackage: string;

/**
 * Loader used for obtaining ComponentFactory from component`s metadata
 */
@Injectable({providedIn: 'root'})
export class ComponentLoader
{
    /**
     * Already resolved cached npm packages
     */
    private _cachedNpmPackage: {[componentPackageName: string]: DynamicModule} = {};

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
    public async resolveComponentFactory<TComponent extends DynamicComponent>(componentMetadata: DynamicComponentMetadata, parentInjector: Injector): Promise<{factory: ComponentFactory<TComponent>, module: NgModuleRef<any>}>
    {
        this._validate(componentMetadata);

        let componentPackageName = `${componentMetadata.componentPackage}-${componentMetadata.componentName}`;
        let npmPackage: DynamicModule = this._cachedNpmPackage[componentPackageName];

        if(!npmPackage)
        {
            //loads custom npm packages dynamicaly
            npmPackage = await import(`${localPackage}${componentMetadata.componentPackage}/${componentMetadata.componentName}/importIndex`)
                .catch(_error =>
                {
                    return null;
                });

            if(!npmPackage)
            {
                //loads npm package dynamicaly
                npmPackage = await import(`@ngDynamic/${componentMetadata.componentPackage}/${componentMetadata.componentName}/importIndex`)
                    .catch(error =>
                    {
                        throw new Error(`Unable to obtain '${componentMetadata.componentPackage}' component\`s package, error '${error}'.`);
                    });
            }

            this._cachedNpmPackage[componentPackageName] = npmPackage;
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
            factory: componentFactory as ComponentFactory<TComponent>,
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