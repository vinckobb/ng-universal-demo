import {Component, ChangeDetectionStrategy, Input} from "@angular/core";

/**
 * Component used for options in select component
 */
@Component(
{
    selector: 'ng-select>option',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent
{
    //######################### public properties - inputs #########################

    /**
     * Value of option
     */
    @Input()
    public value: any;
}