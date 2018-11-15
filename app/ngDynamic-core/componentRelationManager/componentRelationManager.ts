import {Injector} from "@angular/core";
import {isBlank} from "@asseco/common";

import {DynamicComponent, DynamicComponentRelationManagerMetadata, DynamicComponentRelationMetadata, DynamicComponentRelationManagerInputOutputMetadata} from "../interfaces";
import {ComponentManager} from "../componentManager";

/**
 * Manager used for handling relations between components
 */
export class ComponentRelationManager<TComponent extends DynamicComponent<any>>
{
    //######################### private fields #########################

    /**
     * Relations metadata
     */
    private _relations: {[id: string]: DynamicComponentRelationManagerMetadata} = {};

    /**
     * Array of backward relations, relations that are used for obtaining data for inputs
     */
    private _backwardRelations: {[id: string]: DynamicComponentRelationManagerInputOutputMetadata[]} = {};

    /**
     * Component manager
     */
    private _componentManager: ComponentManager<TComponent>;

    //######################### private properties #########################

    /**
     * Gets instance of component manager
     */
    private get componentManager(): ComponentManager<TComponent>
    {
        if(!this._componentManager)
        {
            this._componentManager = this._injector.get<ComponentManager<TComponent>>(ComponentManager);
        }

        return this._componentManager;
    }

    //######################### constructor #########################
    constructor(metadata: DynamicComponentRelationMetadata[], private _injector: Injector)
    {
        this._initializeRelations(metadata);
    }

    //######################### public methods #########################

    /**
     * Registers newly created component
     * @param id Id of component to be registered
     * @param component Component metadata with instance of component
     */
    public updateRelations(id: string, component: TComponent)
    {
        let metadata: DynamicComponentRelationManagerMetadata = this._relations[id];
        let backwardMetadata = this._backwardRelations[id];

        //this component has no relations
        if(!metadata && (!backwardMetadata || !backwardMetadata.length))
        {
            return;
        }

        //initialize default value from connection to this
        if(backwardMetadata && backwardMetadata.length)
        {
            backwardMetadata.forEach(inputOutput =>
            {
                inputOutput.inputInstance = component;

                this._initBackwardRelation(inputOutput.outputNodeId, inputOutput);
            });
        }

        if(metadata)
        {
            metadata.inputOutputs.forEach(inputOutput =>
            {
                //initialize default value from this to its connections
                this._transferData(component, inputOutput.outputName, inputOutput.inputInstance, inputOutput.inputName);

                //set listening for output changes
                metadata.outputsChangeSubscriptions.push(component[`${inputOutput.outputName}Change`].subscribe(() =>
                {
                    this._transferData(component, inputOutput.outputName, inputOutput.inputInstance, inputOutput.inputName);
                }));
            });
        }
    }

    //######################### private methods #########################

    /**
     * Initialize relations from metadata
     * @param metadata Metadata to be used for initialization of relations
     */
    private _initializeRelations(metadata: DynamicComponentRelationMetadata[])
    {
        if(isBlank(metadata))
        {
            return;
        }

        if(!Array.isArray(metadata))
        {
            throw new Error("Metadata are not an array");
        }

        metadata.forEach(meta =>
        {
            let outputs: DynamicComponentRelationManagerInputOutputMetadata[] = [];

            meta.outputs.forEach(output =>
            {
                output.inputs.forEach(input =>
                {
                    let inputOutput = 
                    {
                        inputId: input.id,
                        outputNodeId: meta.id,
                        inputName: input.inputName,
                        outputName: output.outputName
                    };

                    outputs.push(inputOutput);

                    if(!this._backwardRelations[input.id])
                    {
                        this._backwardRelations[input.id] = [];
                    }

                    this._backwardRelations[input.id].push(inputOutput);
                });
            });

            this._relations[meta.id] =
            {
                isClassNode: meta.isClassNode,
                inputOutputs: outputs,
                outputsChangeSubscriptions: []
            };
        });
    }

    /**
     * Initialize backward relation
     * @param id Id of component that is source of relation
     * @param inputOutputMetadata Metadata for input and output
     */
    private _initBackwardRelation(id: string, inputOutputMetadata: DynamicComponentRelationManagerInputOutputMetadata)
    {
        this._transferData(this.componentManager.get(id), inputOutputMetadata.outputName, inputOutputMetadata.inputInstance, inputOutputMetadata.inputName);
    }

    /**
     * Transfers data from source property to target property
     * @param source Instance of source object containing source property with data
     * @param sourceProperty Name of source property with data that are transfered
     * @param target Instance of target object containing target property for data
     * @param targetProperty Name of target property which will be filled with data
     */
    private _transferData(source: TComponent, sourceProperty: string, target: TComponent, targetProperty: string)
    {
        if(!source || !target)
        {
            return;
        }

        target[targetProperty] = source[sourceProperty];

        if(target.invalidateVisuals)
        {
            target.invalidateVisuals();
        }
    }
}