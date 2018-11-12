import {Component, ChangeDetectionStrategy, Inject, Optional, OnDestroy, ElementRef, ChangeDetectorRef, forwardRef} from "@angular/core";
import {Utils, isArray} from "@ng/common";
import {CssGridContentRendererOptions} from "./cssGridContentRenderer.interface";
import {GRID_PLUGIN_INSTANCES, CONTENT_RENDERER_OPTIONS, GridPluginInstances, BasicTableMetadata, BasicTableColumn, ContentRendererAbstractComponent, PluginDescription} from "@ng/grid";
import {CssGridBodyContentRendererComponent} from "./body/cssGridBodyContentRenderer.component";
import {CssGridHeaderContentRendererComponent} from "./header/cssGridHeaderContentRenderer.component";

/**
 * Default options for 'CssGridContentRendererComponent'
 * @internal
 */
const defaultOptions: CssGridContentRendererOptions =
{
    cssClasses:
    {
        gridDiv: 'css-grid-table'
    },
    plugins:
    {
        bodyRenderer: <PluginDescription<CssGridBodyContentRendererComponent<any>>>
        {
            type: forwardRef(() => CssGridBodyContentRendererComponent)
        },
        headerRenderer: <PluginDescription<CssGridHeaderContentRendererComponent<any>>>
        {
            type: forwardRef(() => CssGridHeaderContentRendererComponent)
        }
    }
};

/**
 * Component used for 'CssGridContentRendererComponent'
 */
@Component(
{
    selector: 'div.css-grid-content-renderer',
    templateUrl: 'cssGridContentRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        .css-grid-table
        {
            display: grid;
        }
    `]
})
export class CssGridContentRendererComponent<TOrdering, TData, TMetadata> extends ContentRendererAbstractComponent<TOrdering, TData, TMetadata, CssGridContentRendererOptions> implements OnDestroy
{
    public gridTemplateColumns: string = "";

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                private _changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances,
                @Inject(CONTENT_RENDERER_OPTIONS) @Optional() options?: CssGridContentRendererOptions)
    {
        super(pluginElement, gridPlugins);

        this._options = Utils.common.extend(true, {}, defaultOptions, options);
    }

    protected _invalidateVisuals()
    {
        super._invalidateVisuals();

        this._setGridColumnsWidth();

        this._changeDetector.detectChanges();
    }

    private _setGridColumnsWidth()
    {
        let metadata: BasicTableMetadata<BasicTableColumn<TData>> = <any>this._metadataSelector.metadata;

        if (isArray(metadata.columns))
        {
            let gridTemplateColumns: string[] = [];
            metadata.columns.forEach(column => {
                if (column.visible)
                {
                    gridTemplateColumns.push(column.width ? column.width : 'auto');
                }
            });
            this.gridTemplateColumns = gridTemplateColumns.join(" ");
        }
    }
}
