import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";

import {PlaceholderBaseComponent, OptionsService} from "../../../../../../ngDynamic-designer";
import {DynamicComponentMetadataGeneric} from "../../../../../../ngDynamic-core";
import {BlockComponentOptions} from "../../block.interface";

/**
 * Block designer layout component used for designing components
 */
@Component(
{
    selector: 'block-layout-designer-component',
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
                optionsSvc: OptionsService)
    {
        super(changeDetector, optionsSvc);

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
}