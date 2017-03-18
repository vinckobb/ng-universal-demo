import {Injectable, InjectionToken, Optional, Inject} from '@angular/core';
import {RequestOptionsArgs, Http, ConnectionBackend, RequestOptions, Response, Request, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';

/**
 * Class representing Http that can be globaly intercepted via HttpInterceptor
 */
@Injectable()
export class InterceptableHttp extends Http
{
    //######################### constructor #########################
    constructor(backend: ConnectionBackend,
                defaultOptions: RequestOptions)
    {
        super(backend, defaultOptions);
    }

    //######################### public methods - Http overriden #########################
    request(url: string | Request, options?: RequestOptionsArgs) : Observable<Response>
    {
        return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs) : Observable<Response>
    {
        console.log("get running");

        return super.get(url, options);
    }
}
