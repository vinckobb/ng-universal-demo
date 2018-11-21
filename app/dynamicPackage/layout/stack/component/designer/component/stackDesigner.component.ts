import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";

import {DynamicComponentMetadataGeneric} from "../../../../../../ngDynamic-core";
import {DesignerDynamicComponentGeneric} from "../../../../../../ngDynamic-designer";
import {StackComponentOptions} from "../../stack.interface";

/**
 * Stack designer layout component used for designing components
 */
@Component(
{
    selector: 'stack-layout-designer-component',
    templateUrl: 'stackDesigner.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackDesignerComponent implements DesignerDynamicComponentGeneric<StackComponentOptions, any>
{
    //######################### public properties #########################

    /**
     * Options used for rendering this component
     */
    public options: StackComponentOptions;

    /**
     * Layout metadata that will be used for rendering
     */
    public metadata: DynamicComponentMetadataGeneric<any>;

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