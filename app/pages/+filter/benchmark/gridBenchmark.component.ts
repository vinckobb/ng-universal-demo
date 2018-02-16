import {Component, ViewChild} from '@angular/core';
import {ComponentRedirectRoute, ComponentRoute, OrderByDirection, Paginator} from '@ng/common';
import {GridOptions, GridComponent, AsyncDataLoaderOptions, SimpleOrdering, BasicPagingOptions, DataResponse} from '@ng/grid';
import {refreshDataToDefaults} from "@ng/grid/dist/extensions/refreshDataToDefaults";
import {setPage} from "@ng/grid/dist/extensions/setPage";
import {Authorize, AuthGuard} from '@ng/authentication';
import {flyInOutTrigger} from '@ng/animations';

import {GridDataService} from "../../../services/api/gridData/gridData.service";
import {BaseAnimatedComponent} from "../../../misc/baseAnimatedComponent";
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

/**
 * Grid benchmark component
 */
@Component(
{
    selector: "grid-benchmark",
    templateUrl: "gridBenchmark.component.html",
    providers: [GridDataService],
    animations: [flyInOutTrigger]
})
@ComponentRoute({path: 'grid-benchmark'})
@ComponentRoute({path: 'grid-benchmark/:items'})
export class GridBenchmarkComponent extends BaseAnimatedComponent
{
    //######################### private properties ########################

    /**
     * Route params subscription
     */
    private _subscription: Subscription;

    /**
     * Number of items that will appear in grid
     */
    private _maxItems: number = 50;

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
    constructor(private _dataSvc: GridDataService,
                private _route: ActivatedRoute)
    {
        super();

        this._subscription = this._route
                                 .params
                                 .subscribe(params => {
                                     let maxItems = +params['items'];
                                     if (!isNaN(maxItems))
                                     {
                                        this._maxItems = maxItems;
                                     }
                                 });
        
        this.gridOptions =
        {
            plugins:
            {
                dataLoader:
                {
                    options: <AsyncDataLoaderOptions<any, SimpleOrdering>>
                    {
                        autoLoadData: false,
                        dataCallback: this._getData.bind(this)
                    }
                },
                paging:
                {
                    options: <BasicPagingOptions>
                    {
                        itemsPerPageValues: [this._maxItems],
                        initialItemsPerPage: this._maxItems
                    }
                }
            }
        };
    }

    //######################### public methods #########################
    
    /**
     * Sets page for first grid sample
     */
    public clean()
    {
        this.grid.execute(setPage(-1));
    }

    public load()
    {
        this.grid.execute(setPage(1));
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
        if (page == -1)
        {
            return {
                data: [],
                totalCount: 0
            };
        }

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