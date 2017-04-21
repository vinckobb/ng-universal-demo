import {Component, ViewChild} from '@angular/core';
import {ComponentRedirectRoute, ComponentRoute, OrderByDirection, Paginator} from '@ng/common';
import {GridOptions, GridComponent, LoadMorePagingComponent} from '@ng/grid';
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

    /**
     * Grid options that are used for grid initialization
     */
    public gridLoadMoreOptions: GridOptions;

    /**
     * Data for grid
     */
    public dataLoadMore: any[] = [];

    /**
     * Number of all items
     */
    public totalCountLoadMore: number = 0;

    /**
     * Grid component instance
     */
    @ViewChild('gridSample')
    public _sampleGrid: GridComponent;

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

        this.gridLoadMoreOptions =
        {
            initialItemsPerPage: 20,
            initialPage: 1,
            dataCallback: this._getLoadMoreData.bind(this),
            pagingType: LoadMorePagingComponent,
            columnsSelection: true
        };
    }

    //######################### public methods #########################
    
    /**
     * Sets page for first grid sample
     * @param {number} page Page to be set
     */
    public setPage(page: number)
    {
        this._sampleGrid.page = page;
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

    /**
     * Gets data for grid sample 2
     * @param  {number} page Index of requested page
     * @param  {number} itemsPerPage Number of items per page
     * @param  {string} orderBy Order by column name
     * @param  {OrderByDirection} orderByDirection Order by direction
     * @param  {IFinancialRecordFilter} filterData Filter data
     */
    private _getLoadMoreData(page: number, itemsPerPage: number, orderBy: string, orderByDirection: OrderByDirection): void
    {
        this._paginator.setPage(page)
            .setItemsPerPage(itemsPerPage)
            .setItemCount(this.totalCount);

        this._dataSvc
            .getGridDataNext(
            {
                from: this._paginator.getOffset(),
                items: itemsPerPage
            })
            .subscribe(data =>
            {
                this.dataLoadMore = [...this.dataLoadMore.concat(data.data)];
                this.totalCountLoadMore = data.totalCount;
            });
    }
}