import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";

import {DynamicComponentGeneric} from "../../../../ngDynamic-core";
import {StackComponentOptions} from "./stack.interface";

/**
 * Stack layout component used for rendering components
 */
@Component(
{
    selector: 'stack-layout-component',
    templateUrl: 'stack.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackComponent implements DynamicComponentGeneric<StackComponentOptions>
{
    //######################### public properties #########################

    /**
     * Options used for rendering this component
     */
    public options: StackComponentOptions;

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