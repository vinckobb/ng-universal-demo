import {Component, ChangeDetectionStrategy, Input} from "@angular/core";

import {ComponentDesignerMetadata} from "../../..";
import {ComponentMetadata} from "../../../interfaces";
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
     * Name of package that contains this component
     */
    @Input()
    public packageName: string;

    /**
     * Name of component to be rendered
     */
    @Input()
    public componentName: string;

    /**
     * Designer component metadata
     */
    @Input()
    public componentMetadata: ComponentDesignerMetadata

    /**
     * Component metadata
     */
    public get componentData(): ComponentMetadata
    {
        return {
            packageName: this.packageName,
            componentName: this.componentName
        };
    }

    //######################### constructor #########################
    constructor()
    {
    }
}