import {Injectable} from "@angular/core";

import {PackageComponents} from "./packageLoader.interface";
import {DynamicModule} from "../../ngDynamic-core";
import {ComponentDesignerMetadata, DesignerDynamicComponent} from "../interfaces";

declare var localPackage: string;

/**
 * Loader used for obtaining packages and their components for designer
 */
@Injectable({providedIn: 'root'})
export class PackageLoader
{
    /**
     * Already resolved cached npm packages
     */
    private _cachedNpmPackage: {[packageName: string]: PackageComponents} = {};

    //######################### public methods #########################

    /**
     * Gets package components
     * @param packageName Name of package
     */
    public async getPackageComponentsMetadata(packageName: string): Promise<ComponentDesignerMetadata[]>
    {
        await this._loadPackage(packageName);

        return Object.keys(this._cachedNpmPackage[packageName]).map(componentName => this._extractMetadata(this._cachedNpmPackage[packageName][componentName]));
    }
    
    /**
     * Gets package component names
     * @param packageName Name of package
     */
    public async getPackageComponentNames(packageName: string): Promise<string[]>
    {
        await this._loadPackage(packageName);

        return Object.keys(this._cachedNpmPackage[packageName]);
    }

    /**
     * Gets metadata for designer from component
     * @param packageName Name of package
     * @param componentName Name of component which metadata are going to be extracted
     */
    public async getComponentsMetadata(packageName: string, componentName: string): Promise<ComponentDesignerMetadata>
    {
        await this._loadPackage(packageName);

        if(!this._cachedNpmPackage[packageName][componentName])
        {
            throw new Error(`Package '${packageName}' does not contains component '${componentName}'`);
        }

        return this._extractMetadata(this._cachedNpmPackage[packageName][componentName]);
    }

    //######################### private methods #########################

    /**
     * Extracts metadata from modules component
     * @param dynamicModule Module to be checked for component and metadata
     */
    private _extractMetadata(dynamicModule: DynamicModule): ComponentDesignerMetadata
    {
        if(!dynamicModule.component)
        {
            throw new Error('Wrong module, unable to get component for designer');
        }

        let component: DesignerDynamicComponent = dynamicModule.component as any;

        if(!component.ɵMetadata)
        {
            throw new Error('Missing metadata for component!');
        }

        return component.ɵMetadata;
    }

    /**
     * Loads package into cache
     * @param packageName Name of package to be loaded
     */
    private async _loadPackage(packageName: string)
    {
        let npmPackage: PackageComponents = this._cachedNpmPackage[packageName];

        if(!npmPackage)
        {
            //loads custom npm packages dynamicaly
            npmPackage = await import(`${localPackage}${packageName}/designerIndex`)
                .catch(_error =>
                {
                    return null;
                });

            if(!npmPackage)
            {
                //loads npm package dynamicaly
                npmPackage = await import(`@ngDynamic/${packageName}/designerIndex`)
                    .catch(error =>
                    {
                        throw new Error(`Unable to obtain '${packageName}' package, error '${error}'.`);
                    });
            }

            this._cachedNpmPackage[packageName] = npmPackage;
        }
    }
}