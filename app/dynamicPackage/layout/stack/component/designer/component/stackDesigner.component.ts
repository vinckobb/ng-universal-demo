import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";

import {StackComponentOptions} from "../../stack.interface";
import {PlaceholderBaseComponent, OptionsService} from "../../../../../../ngDynamic-designer";
import {DynamicComponentMetadataGeneric} from "../../../../../../ngDynamic-core";
import {PackageLoader} from "../../../../../../ngDynamic-designer/packageLoader";

/**
 * Stack designer layout component used for designing components
 */
@Component(
{
    selector: 'stack-layout-designer-component',
    templateUrl: 'stackDesigner.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackDesignerComponent extends PlaceholderBaseComponent<StackComponentOptions>
{
    //######################### public properties #########################

    /**
     * Layout metadata that will be used for rendering
     */
    public get metadata(): DynamicComponentMetadataGeneric<StackComponentOptions>
    {
        this._metadata.options = this.transformPropertiesToOptions();
        this._metadata.options.children = this.children.map(child => child.metadata);

        return this._metadata;
    }

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                packageLoader: PackageLoader,
                optionsSvc: OptionsService)
    {
        super(changeDetector, packageLoader, optionsSvc);

        this._isContainer = true;
    }

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        super.invalidateVisuals();
    }

    /**
     * Callback after metadata was set
     */
    protected async afterMetadataSet(): Promise<void> 
    {
        if (this._metadata &&
            this._metadata.options &&
            this._metadata.options.children)
        {
            for (let child of this._metadata.options.children)
            {
                await this.addChild(child);
            }
        }
    }
}