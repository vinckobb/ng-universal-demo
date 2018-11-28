import {Injector} from "@angular/core";
import {ScriptLoader} from "../../scriptLoader";

import {NodeDefinition} from "../nodeDefinitions.interface";
import {DynamicOutput} from "../../decorators";

/**
 * Node used for calling custom scripts
 */
export class ScriptNode implements NodeDefinition
{
    //######################### private fields #########################

    /**
     * Script loader used for loading types and scripts
     */
    private _scriptLoader: ScriptLoader;

    //######################### public properties #########################

    /**
     * Input to be mapped
     */
    public input: any;

    /**
     * Output to be mapped
     */
    @DynamicOutput()
    public output: any;

    //######################### constructor #########################
    constructor(injector: Injector)
    {
        this._scriptLoader = injector.get(ScriptLoader);
    }

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public async invalidateVisuals()
    {
        let type = await this._scriptLoader.loadType('index.js');

        this.output = new type().transform(this.input);
    }

    /**
     * Destroys everything that should be destroyed and frees memory
     */
    public destroy(): void
    {
    }
}