import {Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnDestroy} from "@angular/core";

import {ComponentDesignerMetadata} from "../..";
import {PackageLoader} from "../../packageLoader";
import {Subscription} from "rxjs";
import {ComponentsService} from "../../services";

/**
 * Component used for displaying component palette in designer
 */
@Component(
{
    selector: 'designer-component-palette',
    templateUrl: 'componentPalette.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentPaletteComponent implements OnDestroy
{
    //######################### private properties #########################

    /**
     * Subscription for changes of registered components
     */
    private _componentsChangeSubscription: Subscription;

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

    public droplistIds: string[] = [];

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
                private _componentSvc: ComponentsService,
                private _changeDetector: ChangeDetectorRef)
    {
        this._componentsChangeSubscription = this._componentSvc.componentsChange.subscribe(() => {this._handleComponents()});
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if (this._componentsChangeSubscription)
        {
            this._componentsChangeSubscription.unsubscribe();
            this._componentsChangeSubscription = null;
        }
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

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals()
    {
        this._changeDetector.detectChanges();
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

    /**
     * Gets droplist ids from component service
     */
    private _handleComponents()
    {
        if (!this._componentSvc.components)
        {
            return;
        }

        this.droplistIds = this._componentSvc.components.map(component => component.dropzoneId);

        this.invalidateVisuals();
    }
}