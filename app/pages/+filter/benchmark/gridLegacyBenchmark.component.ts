import {Component, ViewChild, OnDestroy} from '@angular/core';
import {ComponentRedirectRoute, ComponentRoute, OrderByDirection, Paginator} from '@ng/common';
import {GridOptions, GridComponent, LoadMorePagingLegacyComponent, GridLegacyOptions, GridLegacyComponent} from '@ng/grid';
import {Authorize, AuthGuard} from '@ng/authentication';
import {flyInOutTrigger} from '@ng/animations';

import {GridDataService} from "../../../services/api/gridData/gridData.service";
import {BaseAnimatedComponent} from "../../../misc/baseAnimatedComponent";
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

/**
 * Grid legacy benchmark component
 */
@Component(
{
    selector: "grid-legacy-benchmark",
    templateUrl: "gridLegacyBenchmark.component.html",
    providers: [GridDataService],
    animations: [flyInOutTrigger]
})
@ComponentRoute({path: 'grid-legacy-benchmark'})
@ComponentRoute({path: 'grid-legacy-benchmark/:items'})
export class GridLegacyBenchmarkComponent extends BaseAnimatedComponent implements OnDestroy
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
    public gridOptions: GridLegacyOptions;

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
    public _sampleGrid: GridLegacyComponent;

    //######################### constructor #########################
    constructor(private _dataSvc: GridDataService,
                private _route: ActivatedRoute)
    {
        super();

        this._subscription = this._route
                                 .params
                                 .subscribe(params => {
                                    let maxItems = +params['items'];
                                    if (isNaN(maxItems))
                                    {
                                       this._maxItems = maxItems;
                                    }
                                    });
        
        this.gridOptions =
        {
            initialItemsPerPage: this._maxItems,
            initialPage: 1,
            dataCallback: this._getData.bind(this),
            pagingOptions: {itemsPerPageValues: [this._maxItems]},
            autoLoadData: false,
            columnsSelection: true
        };
    }

    //######################### public methods #########################
    
    /**
     * Removes all data from grid
     */
    public clean()
    {
        this.data = [];
        this.totalCount = 0;
    }

    /** 
     * Loads grid data
     */
    public load()
    {
        this._sampleGrid.refreshToDefault();
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
        this._dataSvc
            .getGridData(
            {
                page: (page - 1),
                size: itemsPerPage
            })
            .subscribe(data =>
            {
                this.data = data.content;
                this.totalCount = data.totalElements;
            });
    }

    /** 
     * Implementation of ngOnDestroy
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}