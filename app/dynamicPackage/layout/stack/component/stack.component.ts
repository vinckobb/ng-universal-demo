import {Component, ChangeDetectionStrategy} from "@angular/core";

import {DynamicComponent} from "../../../../ngDynamic-core";
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
export class StackComponent implements DynamicComponent<StackComponentOptions>
{
    //######################### public properties #########################

    /**
     * Options used for rendering this component
     */
    public options: StackComponentOptions;

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
    }
}