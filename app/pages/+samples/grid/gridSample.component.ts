import {Component} from '@angular/core';
import {ComponentRedirectRoute, ComponentRoute, OrderByDirection, Paginator} from '@ng/common';
import {GridOptions} from '@ng/grid';
import {GridDataService} from "../../../services/api/gridData/gridData.service";

/**
 * Grid samples component
 */
@Component(
{
    selector: "grid-sample",
    templateUrl: "gridSample.component.html",
    providers: [GridDataService]
})
@ComponentRedirectRoute('')
@ComponentRoute({path: 'grid'})
export class GridSampleComponent
{
    //######################### private fields #########################

    /**
     * Paginator used for getting page numbers
     */
    protected _paginator: Paginator = new Paginator();

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

    //######################### constructor #########################
    constructor(private _dataSvc: GridDataService)
    {
        this.gridOptions =
        {
            initialItemsPerPage: 10,
            initialPage: 1,
            dataCallback: this._getData.bind(this),
            pagingOptions: {itemsPerPageValues: [10, 20]},
            columnsSelection: true
        };
    }

    //######################### private methods #########################

    /**
     * Gets data for grid
     * @param  {number} page Index of requested page
     * @param  {number} itemsPerPage Number of items per page
     * @param  {string} orderBy Order by column name
     * @param  {OrderByDirection} orderByDirection Order by direction
     * @param  {IFinancialRecordFilter} filterData Filter data
     */
    private _getData(page: number, itemsPerPage: number, orderBy: string, orderByDirection: OrderByDirection): void
    {
        this._paginator.setPage(page)
            .setItemsPerPage(itemsPerPage)
            .setItemCount(this.totalCount);

        this._dataSvc
            .getGridData(
            {
                from: this._paginator.getOffset(),
                items: itemsPerPage
            })
            .subscribe(data =>
            {
                this.data = data.data;
                this.totalCount = data.totalCount;
            });
    }
}