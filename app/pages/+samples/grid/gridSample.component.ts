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
            },
            {
                name: "Sergej",
                surname: "Testovov",
                email: "sergej@testovov.sk",
                address: "Sušany"
            },
            {
                name: "Ibrahim",
                surname: "Netest",
                email: "ibrahim@netest.sk",
                address: "Málinec"
            },
            {
                name: "Alexander",
                surname: "Pretest",
                email: "alexander@pretest.sk",
                address: "Ožďany"
            },
            {
                name: "Vachar",
                surname: "Zojtech",
                email: "vachar@zojtech.sk",
                address: "Poltár"
            },
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
            },
            {
                name: "Sergej",
                surname: "Testovov",
                email: "sergej@testovov.sk",
                address: "Sušany"
            },
            {
                name: "Ibrahim",
                surname: "Netest",
                email: "ibrahim@netest.sk",
                address: "Málinec"
            },
            {
                name: "Alexander",
                surname: "Pretest",
                email: "alexander@pretest.sk",
                address: "Ožďany"
            },
            {
                name: "Vachar",
                surname: "Zojtech",
                email: "vachar@zojtech.sk",
                address: "Poltár"
            }
        ];

        this.totalCount = 12;
    }
}