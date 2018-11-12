import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Optional, Inject, HostBinding, ElementRef} from "@angular/core";
import {Utils} from "@ng/common";
import {BodyContentRendererAbstractComponent, GRID_PLUGIN_INSTANCES, BODY_CONTENT_RENDERER_OPTIONS, GridPluginInstances, CssDivsBodyContentRendererOptions, BasicTableMetadata, BasicTableColumn} from "@ng/grid";
import {CssGridBodyContentRendererOptions, CssClassesCssGridBodyContentRenderer} from "../cssGridContentRenderer.interface";

/**
 * Default options for 'CssGridBodyContentRendererComponent'
 * @internal
 */
const defaultOptions: CssGridBodyContentRendererOptions =
{
    cssClasses:
    {
        bodyDiv: '',
        rowDiv: 'body-row',
        cellDiv: 'body-cell'
    }
};

/**
 * Component used for rendering body for 'CssGridContentRenderer'
 */
@Component(
{
    selector: 'div.content-renderer-body',
    templateUrl: 'cssGridBodyContentRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles:
    [
        `.body-row
        {
            display: contents;
        }

        .body-row:nth-of-type(2n+0) > .body-cell
        {
            background-color: #f9f9f9;
        }

        .body-row:hover > .body-cell
        {
            background-color: #f5f5f5;
        }

        .body-cell
        {
            padding: 3px;
            line-height: 1.42857143;
            vertical-align: middle;
            border-top: 1px solid #ddd;
        }
        `
    ]
})
export class CssGridBodyContentRendererComponent<TData> extends BodyContentRendererAbstractComponent<TData, CssGridBodyContentRendererOptions, BasicTableMetadata<BasicTableColumn<TData>>, CssClassesCssGridBodyContentRenderer>
{
    //######################### public properties - hosts #########################

    /**
     * Css class applied to grid itself
     */
    @HostBinding('class')
    public get cssClass(): string
    {
        return this._options.cssClasses.bodyDiv;
    }

    @HostBinding('style.display')
    public display: string = "contents";

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances,
                @Inject(BODY_CONTENT_RENDERER_OPTIONS) @Optional() options: CssDivsBodyContentRendererOptions)
    {
        super(pluginElement, changeDetector, gridPlugins);

        this._options = Utils.common.extend(true, {}, defaultOptions, options);
    }
}
