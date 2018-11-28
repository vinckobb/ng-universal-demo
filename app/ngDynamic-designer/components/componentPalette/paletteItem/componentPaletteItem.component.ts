import {Component, ChangeDetectionStrategy, Input} from "@angular/core";

import {DesignerLayoutMetadata} from "../../../interfaces";
import {DesignerItemId} from "../../../interfaces";
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
     * List of available droplists
     */
    @Input()
    public droplistIds: string[];

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
    public componentMetadata: DesignerLayoutMetadata

    /**
     * Component metadata
     */
    public get componentData(): DesignerItemId
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