import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";

import {DynamicComponentGeneric} from "../../../../ngDynamic-core";
import {BlockComponentOptions} from "./block.interface";

/**
 * Layout component used for formatting block content
 */
@Component(
{
    selector: 'block-layout-component',
    templateUrl: 'block.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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