import {Component, ChangeDetectionStrategy} from "@angular/core";

import {PlaceholderBaseComponent} from "../../../../../../ngDynamic-designer";
import {DynamicComponentMetadataGeneric} from "../../../../../../ngDynamic-core";
import {TextBlockComponentOptions} from "../../textBlock.interface";

/**
 * Text block designer layout component used for designing components
 */
@Component(
{
    selector: 'div[text-block-designer]',
    templateUrl: 'textBlockDesigner.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBlockDesignerComponent extends PlaceholderBaseComponent<TextBlockComponentOptions>
{
    //######################### public properties #########################

    /**
     * Layout metadata that will be used for rendering
     */
    public get metadata(): DynamicComponentMetadataGeneric<TextBlockComponentOptions>
    {
        return this._metadata;
    }

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        super.invalidateVisuals();
    }
}