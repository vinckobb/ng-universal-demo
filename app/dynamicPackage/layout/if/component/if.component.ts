import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";

import {DynamicComponent} from "../../../../ngDynamic-core";
import {IfComponentOptions} from "./if.interface";

/**
 * If component used for conditionaly displaing component
 */
@Component(
{
    selector: 'if-layout-component',
    templateUrl: 'if.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IfComponent implements DynamicComponent<IfComponentOptions>
{
    //######################### public properties #########################

    /**
     * Condition used for determining whether display content of this component
     */
    public condition: boolean = false;

    /**
     * Options used for rendering this component
     */
    public options: IfComponentOptions;

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