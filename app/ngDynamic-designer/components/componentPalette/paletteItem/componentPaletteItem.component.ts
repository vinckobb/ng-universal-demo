import {Component, ChangeDetectionStrategy, Input} from "@angular/core";

import {ComponentDesignerMetadata} from "../../..";
/**
 * Component used for displaying component palette in designer
 */
@Component(
{
    selector: 'component-palette-item',
    templateUrl: 'componentPaletteItem.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentPaletteItemComponent
{
    //######################### public properties - inputs #########################

    /**
     * Designer component metadata
     */
    @Input()
    public componentMetadata: ComponentDesignerMetadata

    //######################### constructor #########################
    constructor()
    {
    }
}