import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";

import {DynamicComponent} from "../../../../ngDynamic-core";
import {ConditionalComponentOptions} from "./conditional.interface";

/**
 * Conditional layout component used for conditionaly displaing component
 */
@Component(
{
    selector: 'conditional-layout-component',
    templateUrl: 'conditional.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConditionalComponent implements DynamicComponent<ConditionalComponentOptions>
{
    //######################### public properties #########################

    /**
     * Condition used for determining whether display content of this component
     */
    public condition: boolean = false;

    /**
     * Options used for rendering this component
     */
    public options: ConditionalComponentOptions;

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