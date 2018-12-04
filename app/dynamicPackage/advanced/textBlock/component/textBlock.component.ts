import {Component, ChangeDetectionStrategy, ElementRef} from "@angular/core";
import * as handlebars from 'handlebars';

import {DynamicComponentGeneric} from "../../../../ngDynamic-core";
import {TextBlockOptions} from "./textBlock.interface";

/**
 * Component used for displaying handlebars template and rendering objects
 */
@Component(
{
    selector: 'div[text-block-handlebars]',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBlockComponent implements DynamicComponentGeneric<TextBlockOptions>
{
    //######################### private fields #########################

    /**
     * Delegate used for creating html template filled with data
     */
    private _templateRendererDelegate: Handlebars.TemplateDelegate<any>;

    //######################### public properties #########################

    /**
     * Options used for rendering this component
     */
    public options: TextBlockOptions;

    /**
     * Object that will be displayed in template
     */
    public data: any = {};

    //######################### constructor #########################
    constructor(private _element: ElementRef<HTMLDivElement>)
    {
    }

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        if(!this._templateRendererDelegate)
        {
            this._templateRendererDelegate = handlebars.compile(this.options.template);
        }

        if(this.data)
        {
            this._element.nativeElement.innerHTML = this._templateRendererDelegate(this.data);
        }
    }
}