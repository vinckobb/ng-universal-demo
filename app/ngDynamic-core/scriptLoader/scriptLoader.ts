import {Injectable, Type, Inject} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {generateId} from '@asseco/common';

/**
 * Class used for loading external scripts
 */
@Injectable({providedIn: 'root'})
export class ScriptLoader
{
    //######################### private fields #########################

    /**
     * Loaded types for paths
     */
    private _loadedTypes: {[path: string]: Type<any>} = {};

    //######################### constructor #########################
    constructor(private _http: HttpClient,
                @Inject(DOCUMENT) private _document: HTMLDocument)
    {
    }

    //######################### public methods #########################

    /**
     * Loads type from path
     * @param path Path used for obtaining type
     */
    public loadType(path: string): Promise<Type<any>>
    {
        if(this._loadedTypes[path])
        {
            return Promise.resolve(this._loadedTypes[path]);
        }

        return new Promise<Type<any>>(async resolve =>
        {
            let scriptText = await this._http.get(path,
                                                  {
                                                      responseType: 'text'
                                                  }).toPromise();

            let script = this._document.createElement("script");
            let loadTypeFuncName = `loadType${generateId(12)}`;
            let type: Type<any>;

            script.innerText =
            `
                (function(exports, loadType, require)
                {
                    ${scriptText}

                    loadType(exports);
                })({}, ${loadTypeFuncName});
            `;

            window[loadTypeFuncName] = exp =>
            {
                type = exp[Object.keys(exp)[0]];
            };

            this._document.getElementsByTagName("head")[0].appendChild(script);
            delete window[loadTypeFuncName];
            script.remove();

            this._loadedTypes[path] = type;

            resolve(type);
        });
    }
}