import {Component, ChangeDetectionStrategy} from "@angular/core";

import {DynamicComponent} from "../../../../../ngDynamic-core/interfaces/dynamicComponent/dynamicComponent.interface";

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
    options: string;

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
    }
}