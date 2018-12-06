import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";

import {PlaceholderBaseComponent, PropertiesService} from "../../../../../../ngDynamic-designer";
import {DynamicComponentMetadataGeneric} from "../../../../../../ngDynamic-core";
import {BlockComponentOptions} from "../../block.interface";
import {PackageLoader} from "../../../../../../ngDynamic-designer/packageLoader";

/**
 * Block designer layout component used for designing components
 */
@Component(
{
    selector: 'div[block-layout-designer]',
    templateUrl: 'blockDesigner.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockDesignerComponent extends PlaceholderBaseComponent<BlockComponentOptions>
{
    //######################### public properties #########################

    /**
     * Layout metadata that will be used for rendering
     */
    public get metadata(): DynamicComponentMetadataGeneric<BlockComponentOptions>
    {
        this._metadata.options = this.transformPropertiesToOptions();

        return this._metadata;
    }

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                packageLoader: PackageLoader,
                optionsSvc: PropertiesService)
    {
        super(changeDetector, packageLoader, optionsSvc);

        this._isContainer = true;
    }
}