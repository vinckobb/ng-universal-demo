import {Component, ChangeDetectionStrategy, Inject, Optional, OnDestroy, ElementRef, ChangeDetectorRef} from "@angular/core";
import {Utils, isArray} from "@ng/common";
import {CssGridContentRendererOptions} from "./cssGridContentRenderer.interface";
import {SimpleContentRendererAbstractComponent} from "../simpleContentRendererAbstract.component";
import {GRID_PLUGIN_INSTANCES, CONTENT_RENDERER_OPTIONS, GridPluginInstances, BasicTableMetadata, BasicTableColumn} from "@ng/grid";

/**
 * Default options for 'CssGridContentRendererComponent'
 * @internal
 */
const defaultOptions: CssGridContentRendererOptions =
{
    cssClasses:
    {
        grid: 'css-grid-table',
        containerDiv: '',
        headerCell: 'header-default',
        row: 'row-default',
        cell: 'cell-default'
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        .css-grid-table
        {
            display: grid;
        }

        [role=gridrow]
        {
            display: contents;
        }

        .row-default:hover > *
        {
            background-color: #E3E3E3;
            cursor: pointer;
        }

        .cell-default
        {
        }
    `]
})
export class CssGridContentRendererComponent<TOrdering, TData> extends SimpleContentRendererAbstractComponent<TOrdering, TData, BasicTableMetadata<BasicTableColumn<TData>>, CssGridContentRendererOptions> implements OnDestroy
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

    public invalidateVisuals()
    {
        super.invalidateVisuals();

        this._setGridColumnsWidth();

        this._changeDetector.detectChanges();
    }

    /**
     * Merges css classes specified as strings
     */
    public mergeStringClasses(...classes: string[])
    {
        let result = [];

        classes.forEach(cls => cls ? (result.push(cls)) : null);

        return result;
    }

    private _setGridColumnsWidth()
    {
        if (isArray(this.metadata.columns))
        {
            let gridTemplateColumns: string[] = [];
            this.metadata.columns.forEach(column => {
                if (column.visible)
                {
                    gridTemplateColumns.push(column.width ? column.width : 'auto');
                }
            });
            this.gridTemplateColumns = gridTemplateColumns.join(" ");
        }
    }
}
