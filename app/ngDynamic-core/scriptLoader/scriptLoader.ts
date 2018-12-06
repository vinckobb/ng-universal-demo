import {Injectable, Type, Inject} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {generateId} from '@asseco/common';

/**
 * Class used for loading external scripts
 */
@Injectable({providedIn: 'root'})
export class ScriptLoader
{
    //######################### private fields #########################

    /**
     * Loaded types for scripts
     */
    private _loadedTypes: {[script: string]: Type<any>} = {};

    //######################### constructor #########################
    constructor(@Inject(DOCUMENT) private _document: HTMLDocument)
    {
    }

    //######################### public methods #########################

    /**
     * Loads type from script
     * @param script Script used for obtaining type
     */
    public loadType(script: string): Type<any>
    {
        if(this._loadedTypes[script])
        {
            return this._loadedTypes[script];
        }

        let scriptElement = this._document.createElement("script");
        let loadTypeFuncName = `loadType${generateId(12)}`;
        let type: Type<any>;

        scriptElement.innerText = `
        (function(exports, loadType, require)
        {
            ${script}

            loadType(exports);
        })({}, ${loadTypeFuncName});`;

        window[loadTypeFuncName] = exp =>
        {
            type = exp[Object.keys(exp)[0]];
        };

        this._document.getElementsByTagName("head")[0].appendChild(scriptElement);
        delete window[loadTypeFuncName];
        scriptElement.remove();

        this._loadedTypes[script] = type;

        return type;
    }
}