import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";

import {DynamicComponentGeneric} from "../../../../ngDynamic-core";
import {DynamicComponentDesignerMetadata} from "../../../../ngDynamic-designer";
import {BlockComponentOptions} from "./block.interface";
import {placeholderModule, layoutMetadata, relationsMetadata} from "./designer";

/**
 * Layout component used for formatting block content
 */
@Component(
{
    selector: 'block-layout-component',
    templateUrl: 'block.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DynamicComponentDesignerMetadata(
{
    placeholderModule,
    layoutMetadata,
    relationsMetadata
})
export class BlockComponent implements DynamicComponentGeneric<BlockComponentOptions>
{
    //######################### public properties #########################

    /**
     * Options used for rendering this component
     */
    public options: BlockComponentOptions;

    //######################### constructor #########################
    constructor(private _changeDetector: ChangeDetectorRef)
    {
    }

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }
}