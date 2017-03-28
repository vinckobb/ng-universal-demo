import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {RESTClient, GET, ResponseType, Produces, BaseUrl, DefaultHeaders} from '@ng/rest';

import {Data} from "./data.interface";
import {Observable} from 'rxjs/Observable';
import * as global from 'config/global';

/**
 * Service used to access financial records api
 **/
@Injectable()
@BaseUrl(global.apiBaseUrl)
@DefaultHeaders(global.defaultApiHeaders)
export class DataService extends RESTClient
{
    //######################### public methods #########################
    /**
     * Gets data
     */
    @Produces(ResponseType.Json)
    @GET("data")
    public getData(): Observable<Data>
    {
        return null;
    }
}