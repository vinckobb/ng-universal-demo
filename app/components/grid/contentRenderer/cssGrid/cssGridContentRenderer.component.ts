import {Component, ChangeDetectionStrategy, Inject, Optional, OnDestroy, ElementRef, ChangeDetectorRef} from "@angular/core";
import {Utils} from "@ng/common";
import {CssGridContentRendererOptions} from "./cssGridContentRenderer.interface";
import {SimpleContentRendererAbstractComponent} from "../simpleContentRendererAbstract.component";
import {GRID_PLUGIN_INSTANCES, CONTENT_RENDERER_OPTIONS, GridPluginInstances} from "@ng/grid";

/**
 * Default options for 'CssGridContentRendererComponent'
 * @internal
 */
const defaultOptions: CssGridContentRendererOptions =
{
    cssClasses:
    {
    },
    plugins:
    {
    }
};

/**
 * Component used for 'CssGridContentRendererComponent'
 */
@Component(
{
    selector: 'div.css-grid-content-renderer',
    templateUrl: 'cssGridContentRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssGridContentRendererComponent<TOrdering, TData, TMetadata> extends SimpleContentRendererAbstractComponent<TOrdering, TData, TMetadata, CssGridContentRendererOptions> implements OnDestroy
{
    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                private _changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances,
                @Inject(CONTENT_RENDERER_OPTIONS) @Optional() options?: CssGridContentRendererOptions)
    {
        super(pluginElement, gridPlugins);

        this._options = Utils.common.extend(true, {}, defaultOptions, options);
    }

    public invalidateVisuals()
    {
        super.invalidateVisuals();

        this._changeDetector.detectChanges();
    }

    public logTest()
    {
        console.log("clicked on display:contents");
    }
}
