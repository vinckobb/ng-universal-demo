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
import { Table } from 'primeng/table';

/**
 * Grid benchmark component
 */
@Component(
{
    selector: "turbo-table-benchmark",
    templateUrl: "turboTableBenchmark.component.html",
    providers: [GridDataService],
    animations: [flyInOutTrigger]
})
@ComponentRoute({path: 'turbo-table-benchmark'})
@ComponentRoute({path: 'turbo-table-benchmark/:items'})
export class TurboTableBenchmarkComponent extends BaseAnimatedComponent
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

    @ViewChild('turboTable')
    public table: Table

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
    }

    //######################### public methods #########################
    
    /**
     * Sets page for first grid sample
     */
    public clean()
    {
        this.data = [];
    }

    public load()
    {
        this.table.reset();
    }

    //######################### private methods #########################

    /**
     * Gets data for grid
     * @param  {number} page Index of requested page
     * @param  {number} itemsPerPage Number of items per page
     * @param  {TOrdering} orderBy Order by column name
     */
    public getData(event)
    {
        let data = this._dataSvc
            .getGridData(
            {
                page: 0,
                size: this._maxItems
            })
            .subscribe(data =>
            {
                this.data = data.content;
            });
    }
}