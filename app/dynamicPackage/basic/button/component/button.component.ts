import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";

import {DynamicComponentGeneric} from "../../../../ngDynamic-core";
import {ButtonComponentOptions} from "./button.interface";

/**
 * Component used for displaying button
 */
@Component(
{
    selector: 'button-component',
    templateUrl: 'button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements DynamicComponentGeneric<ButtonComponentOptions>
{
    //######################### public properties #########################

    /**
     * Options used for rendering this component
     */
    public options: ButtonComponentOptions;

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