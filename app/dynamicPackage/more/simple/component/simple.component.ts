import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";

import {DynamicComponent} from "../../../../ngDynamic-core";

/**
 * Simple component
 */
@Component(
{
    selector: 'simple-component',
    templateUrl: 'simple.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleComponent implements DynamicComponent<string>
{
    //######################### public properties #########################

    /**
     * Options used for rendering this component
     */
    public options: string = 'default';

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