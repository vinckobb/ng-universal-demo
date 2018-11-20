import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";

import {DynamicComponentGeneric} from "../../../../ngDynamic-core";

/**
 * Component used for designing relation nodes
 */
@Component(
{
    selector: 'node-designer-component',
    template: 'node',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeDesignerComponent implements DynamicComponentGeneric<any>
{
    //######################### public properties #########################

    /**
     * Options used for rendering this component
     */
    public options: any;

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