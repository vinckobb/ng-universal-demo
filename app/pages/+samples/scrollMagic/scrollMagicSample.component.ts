import {Component, ViewChild, AfterViewInit, forwardRef, AfterViewChecked, ChangeDetectionStrategy, AfterContentChecked, OnDestroy} from '@angular/core';
import {ComponentRedirectRoute, ComponentRoute, OrderByDirection, Paginator} from '@ng/common';
import {GridOptions, GridComponent, AsyncDataLoaderOptions, SimpleOrdering, BasicPagingOptions, DataResponse, AdvancedTableBodyContentRendererComponent, PluginDescription, ContentRendererOptions, TableContentRendererOptions, AdvancedMetadataSelectorComponent, METADATA_SELECTOR_TYPE, METADATA_SELECTOR, MetadataSelector, DataLoader, DATA_LOADER, ContentRenderer, CONTENT_RENDERER, BODY_CONTENT_RENDERER, BodyContentRenderer} from '@ng/grid';
import {Authorize, AuthGuard} from '@ng/authentication';
import {flyInOutTrigger} from '@ng/animations';

import {GridDataService} from "../../../services/api/gridData/gridData.service";
import {BaseAnimatedComponent} from "../../../misc/baseAnimatedComponent";

/**
 * Scroll magic sample component
 */
@Component(
{
    selector: "scroll-magic-sample",
    templateUrl: "scrollMagicSample.component.html",
    providers: [GridDataService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [flyInOutTrigger]
})
@ComponentRedirectRoute('')
@ComponentRoute({path: 'scroll-magic'})
export class ScrollMagicSampleComponent extends BaseAnimatedComponent implements AfterViewInit, OnDestroy
{
    //######################### private properties ########################

    /**
     * Mutation observer for @ng/grid
     */
    private _mutationObserver: MutationObserver;

    //######################### public properties #########################

    /**
     * Grid options that are used for grid initialization
     */
    public gridOptions: GridOptions;

    /**
     * Data for grid
     */
    public data: any[] = [];

    /**
     * Number of all items
     */
    public totalCount: number = 0;
    /**
     * Grid component instance
     */
    @ViewChild('grid')
    public grid: GridComponent;

    //######################### constructor #########################
    constructor(private _dataSvc: GridDataService)
    {
        super();
        
        this.gridOptions =
        {
            plugins:
            {
                dataLoader:
                {
                    options: <AsyncDataLoaderOptions<any, SimpleOrdering>>
                    {
                        dataCallback: this._getData.bind(this)
                    }
                },
                paging:
                {
                    options: <BasicPagingOptions>
                    {
                        itemsPerPageValues: [10, 100, 2500],
                        initialItemsPerPage: 100
                    }
                }
            }
        };
    }

    //######################### public methods #########################

    public ngAfterViewInit()
    {
        /*this.grid.execute(() =>
        {
            let bodyContentRenderer = this.grid.getPlugin<BodyContentRenderer<any, any>>(BODY_CONTENT_RENDERER);
            let contentRenderer = this.grid.getPlugin<ContentRenderer<any>>(CONTENT_RENDERER);

            if (contentRenderer)
            {
                let jqueryElement: any = $(contentRenderer.pluginElement.nativeElement);
                jqueryElement.floatThead({
                    position: 'fixed'
                });

                this._mutationObserver = new MutationObserver(data =>
                    {
                        jqueryElement.trigger('reflow');
                    }
                );
    
                if (bodyContentRenderer)
                {
                    this._mutationObserver.observe(bodyContentRenderer.pluginElement.nativeElement, {childList: true});
                }
            }
        });*/
    }

    public ngOnDestroy()
    {
        if (this._mutationObserver)
        {
            this._mutationObserver.disconnect();
        }

        this._mutationObserver = null;
    }

    //######################### private methods #########################

    /**
     * Gets data for grid
     * @param  {number} page Index of requested page
     * @param  {number} itemsPerPage Number of items per page
     * @param  {TOrdering} orderBy Order by column name
     */
    private async _getData(page: number, itemsPerPage: number, orderBy: SimpleOrdering): Promise<DataResponse<any>>
    {
        let data = await this._dataSvc
            .getGridData(
            {
                page: (page - 1),
                size: itemsPerPage
            })
            .toPromise();

        return {
            data: data.content,
            totalCount: data.totalElements
        };
    }
}