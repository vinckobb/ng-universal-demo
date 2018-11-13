import {Component, ChangeDetectionStrategy} from "@angular/core";

/**
 * Simple component
 */
@Component(
{
    selector: 'simple-component',
    templateUrl: 'simple.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleComponent
{
}