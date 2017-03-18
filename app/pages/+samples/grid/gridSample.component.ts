import {Component} from '@angular/core';
import {ComponentRedirectRoute, ComponentRoute, OrderByDirection} from '@ng/common';
import {GridOptions} from '@ng/grid';

@Component(
{
    selector: "grid-sample",
    templateUrl: "gridSample.component.html"
})
@ComponentRedirectRoute('')
@ComponentRoute({path: 'grid'})
export class GridSampleComponent
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

    //######################### constructor #########################
    constructor()
    {
        this.gridOptions =
        {
            initialItemsPerPage: 10,
            initialPage: 1,
            dataCallback: this._getData.bind(this),
            itemsPerPageValues: [10, 20]
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
        this.data =
        [
            {
                name: "Testo",
                surname: "Steron",
                email: "testo@steron.sk",
                address: "Veľká Suchá"
            },
            {
                name: "Testovič",
                surname: "Testov",
                email: "testovic@testov.sk",
                address: "Pondelok"
            }
        ];

        this.totalCount = 2;
    }
}