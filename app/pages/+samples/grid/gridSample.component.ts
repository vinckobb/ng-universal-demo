import {Component, ViewChild} from '@angular/core';
import {ComponentRedirectRoute, ComponentRoute, OrderByDirection, Paginator} from '@ng/common';
import {GridOptions, GridComponent, LoadMorePagingLegacyComponent, GridLegacyOptions, GridLegacyComponent, AsyncDataLoaderOptions, SimpleOrdering, BasicPagingOptions, DataResponse} from '@ng/grid';
import {Authorize, AuthGuard} from '@ng/authentication';
import {flyInOutTrigger} from '@ng/animations';

import {GridDataService} from "../../../services/api/gridData/gridData.service";
import {BaseAnimatedComponent} from "../../../misc/baseAnimatedComponent";

/**
 * Grid samples component
 */
@Component(
{
    selector: "grid-sample",
    templateUrl: "gridSample.component.html",
    providers: [GridDataService],
    animations: [flyInOutTrigger]
})
@ComponentRedirectRoute('')
@ComponentRoute({path: 'grid', canActivate: [AuthGuard]})
@Authorize("gridSample-page")
export class GridSampleComponent extends BaseAnimatedComponent
{
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
    @ViewChild('gridSample')
    public _sampleGrid: GridComponent;

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
                        itemsPerPageValues: [10, 25, 50],
                        initialItemsPerPage: 25
                    }
                }
            }
        };
    }

    //######################### public methods #########################
    
    /**
     * Sets page for first grid sample
     * @param {number} page Page to be set
     */
    public setPage(page: number)
    {
        this._sampleGrid.getPlugin
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