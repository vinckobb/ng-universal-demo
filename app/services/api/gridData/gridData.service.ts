import {Injectable} from '@angular/core';
import {RESTClient, GET, ResponseType, Produces, BaseUrl, DefaultHeaders, QueryObject} from '@ng/rest';

import {GridItem, PagedData} from "./gridData.interface";
import {Observable} from 'rxjs/Observable';
import * as global from 'config/global';

/**
 * Service used to access grid data
 **/
@Injectable()
@BaseUrl(global.apiBaseUrl)
@DefaultHeaders(global.defaultApiHeaders)
export class GridDataService extends RESTClient
{
    //######################### public methods #########################
    
    /**
     * Gets grid data
     */
    @Produces(ResponseType.Json)
    @GET("grid-data")
    public getGridData(@QueryObject paging: {from: number, items: number}): Observable<PagedData<GridItem>>
    {
        return null;
    }

    /**
     * Gets grid data next
     */
    @Produces(ResponseType.Json)
    @GET("grid-data-next")
    public getGridDataNext(@QueryObject paging: {from: number, items: number}): Observable<PagedData<GridItem>>
    {
        return null;
    }
}