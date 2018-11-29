import {Injector} from "@angular/core";

import {ScriptLoader, DynamicOutput, NodeDefinitionGeneric} from "../../ngDynamic-core";
import {DynamicNodeDesignerMetadata} from "../../ngDynamic-designer";
import {ScriptNodeOptions} from "./script.interface";

/**
 * Node used for calling custom scripts
 */
@DynamicNodeDesignerMetadata(
{
    relationsMetadata:
    {
        name: 'Script',
        description: 'Allows you to create custom script to be executed',
        inputs:
        [
            {
                id: 'input',
                name: 'input',
                type: 'any'
            }
        ],
        outputs:
        [
            {
                id: 'output',
                name: 'output',
                type: 'any'
            }
        ]
    }
})
export class ScriptNode implements NodeDefinitionGeneric<ScriptNodeOptions>
{
    //######################### private fields #########################

    /**
     * Script loader used for loading types and scripts
     */
    private _scriptLoader: ScriptLoader;

    //######################### public properties #########################

    /**
     * Options for node
     */
    public options: ScriptNodeOptions;

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