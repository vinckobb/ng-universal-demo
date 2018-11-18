import {Injector} from "@angular/core";
import {HttpClient, HttpRequest, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable, empty} from "rxjs";
import {map} from "rxjs/operators";

import {NodeDefinition, NodeDefinitionGeneric} from "../nodeDefinitions.interface";
import {DynamicOutput} from "../../decorators";
import {RestClientNodeOptions, RestClientNodeParameterValue, RestClientMethodType, RestClientParamType} from "./restClient.interface";

//TODO - updated proxy usage

/**
 * Node used for RestClient http calls real one
 */
class ɵRestClientNode implements NodeDefinitionGeneric<RestClientNodeOptions>
{
    //######################### private fields #########################

    /**
     * Options for node
     */
    private ɵoptions: RestClientNodeOptions;

    /**
     * Http client used for http calls
     */
    private ɵhttpClient: HttpClient;

    /**
     * Object with parameters and their values
     */
    private ɵparameters: {[name: string]: RestClientNodeParameterValue} = {};

    //######################### public properties #########################

    /**
     * Result of REST call
     */
    @DynamicOutput()
    public result: Observable<any>;

    /**
     * Options for node
     */
    public set options(options: RestClientNodeOptions)
    {
        this.ɵoptions = options;

        this._prepareParameters();
    }

    //######################### constructor #########################
    constructor(injector: Injector)
    {
        this.ɵhttpClient = injector.get(HttpClient);
    }

    //######################### public methods #########################

    /**
     * Sets rest client parameters
     * @param parameter Name of property to be set
     * @param value Value to be set
     */
    public setInput(parameter: string, value: any)
    {
        if(this.ɵparameters[parameter])
        {
            this.ɵparameters[parameter].value = value;
        }
    }

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this.result = this._buildResultObserver();
    }

    /**
     * Destroys everything that should be destroyed and frees memory
     */
    public destroy(): void
    {
    }

    //######################### private methods #########################

    /**
     * Method used for preparing parameters
     */
    private _prepareParameters()
    {
        if(this.ɵoptions && this.ɵoptions.parameters && this.ɵoptions.parameters.length)
        {
            this.ɵoptions.parameters.forEach(param =>
            {
                this.ɵparameters[param.inputName] = param;
            });
        }
    }

    /**
     * Builds http client result observer
     */
    private _buildResultObserver(): Observable<any>
    {
        if(!this.ɵoptions)
        {
            return empty();
        }

        let body = null;
        let url: string = this.ɵoptions.url;
        let queryString: string = "";
        let queryParams: RestClientNodeParameterValue[] = [];

        this.ɵoptions.parameters.forEach((param: RestClientNodeParameterValue) =>
        {
            switch(param.type)
            {
                case RestClientParamType.Query:
                {
                    queryParams.push(param);

                    break;
                }
            }
        })

        let params = new HttpParams({fromString: queryString});

        queryParams.forEach(param =>
        {
            if(!param.value)
            {
                return;
            }

            let value = param.value;

            if (value instanceof Object)
            {
                value = JSON.stringify(value);
            }
            
            params = params.append(param.name, value);
        });

        let request = new HttpRequest(RestClientMethodType[this.ɵoptions.method],
                                      url,
                                      body,
                                      {
                                          params
                                      });

        return this.ɵhttpClient.request(request).pipe(map((response: HttpResponse<any>) => response.body));
    }
}

/**
 * Node used for RestClient http calls
 */
export class RestClientNode implements NodeDefinition
{
    //######################### constructor #########################
    constructor(injector: Injector)
    {
        return new Proxy(new ɵRestClientNode(injector),
        {
            set: (target: ɵRestClientNode, property: string, value: any) =>
            {
                if(property == 'options' || property == 'result')
                {
                    target[property] = value;

                    return true;
                }

                target.setInput(property, value);

                return true;
            },
            get: (target: ɵRestClientNode, property: string) =>
            {
                return target[property];
            }

        }) as NodeDefinition;
    }

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
    }

    /**
     * Destroys everything that should be destroyed and frees memory
     */
    public destroy(): void
    {
    }
}