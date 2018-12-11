import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";

import {PropertiesService, DraggablePlaceholderComponent, DragService} from "../../../../../../ngDynamic-designer";
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
export class BlockDesignerComponent extends DraggablePlaceholderComponent<BlockComponentOptions>
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
                optionsSvc: PropertiesService,
                dragSvc: DragService)
    {
        super(changeDetector, packageLoader, optionsSvc, dragSvc);

        this._isContainer = true;
    }
}