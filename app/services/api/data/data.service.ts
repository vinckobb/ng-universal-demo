import {Injectable, Inject, Optional} from '@angular/core';
import {Http} from '@angular/http';
import {RESTClient, GET, ResponseType, Produces, BaseUrl, DefaultHeaders, TransferStateService} from '@ng/rest';
import {SERVER_BASE_URL} from '@ng/common';
import {Observable} from 'rxjs/Observable';
import * as global from 'config/global';
import * as moment from 'moment';

/**
 * Service used to access financial records api
 **/
@Injectable()
@BaseUrl(global.apiBaseUrl)
@DefaultHeaders(global.defaultApiHeaders)
export class DataService extends RESTClient
{
    //######################### constructor #########################
    public constructor(http: Http,
                       @Optional() @Inject(SERVER_BASE_URL) baseUrl: string,
                       transferStateService: TransferStateService)
    {
        super(http, baseUrl, transferStateService);
    }

    @Produces(ResponseType.Json)
    @GET("data")
    public getData(): Observable<any>
    {
        return null;
    }
}