import {Component, ChangeDetectionStrategy, Input, ChangeDetectorRef} from "@angular/core";

import {ComponentDesignerMetadata} from "../..";
import {PackageLoader} from "../../packageLoader";

/**
 * Component used for displaying component palette in designer
 */
@Component(
{
    selector: 'designer-component-palette',
    templateUrl: 'componentPalette.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentPaletteComponent
{
    //######################### private properties #########################

    //private _packageNames: string[];

    //######################### public properties - inputs #########################

    /**
     * Package names
     */
    @Input()
    public set packageNames(packageNames: string[])
    {        
        this._loadPackages(packageNames);
    };

    //######################### public properties - template bindings #########################

    /**
     * Available component packages for designer
     */
    public packages: {[key: string]: {[packageName: string]: ComponentDesignerMetadata}};
    
    /**
     * Array representation of `packages` property
     */
    public get packagesArray(): any[]
    {
        return Object.keys(this.packages);
    }

    //######################### constructor #########################
    constructor(private _packageLoader: PackageLoader,
                private _changeDetector: ChangeDetectorRef)
    {
    }

    //######################### public methods #########################

    /**
     * Returns array of component names for specified package
     * @param packageName 
     */
    public getPackageComponents(packageName): string[]
    {
        return Object.keys(this.packages[packageName]);
    }

    //######################### private methods #########################

    /**
     * Loads specified components packages
     * @param packageNames packageNames to be loaded
     */
    private async _loadPackages(packageNames: string[])
    {
        //TODO upravit. Zatial je to takto iba pre testovanie

        this.packages = {};

        if (!packageNames)
        {
            this._changeDetector.detectChanges();
            return;
        }
            
        for (var i = 0; i < packageNames.length; i++)
        {
            this.packages[packageNames[i]] = await this._packageLoader.getPackageComponentsMetadata(packageNames[i]);
        }

        this._changeDetector.detectChanges();
    }
}