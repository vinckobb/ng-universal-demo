import {DynamicComponentRelationsMetadata, DynamicComponent, DynamicComponentRelationManagerMetadata} from "../interfaces";
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
     * Component manager
     */
    private _componentManager: ComponentManager<TComponent>;

    //######################### constructor #########################
    constructor(private _metadata: DynamicComponentRelationsMetadata)
    {
        this._relations = this._metadata.relations
    }

    //######################### public methods #########################

    /**
     * Sets components manager for this relation manager
     * @param componentManager Component manager
     */
    public registerComponentManager(componentManager: ComponentManager<TComponent>)
    {
        this._componentManager = componentManager;
    }

    /**
     * Registers newly created component
     * @param id Id of component to be registered
     */
    public updateRelations(id: string)
    {
        let metadata: DynamicComponentRelationManagerMetadata = this._relations[id];

        if(!metadata)
        {
            return;
        }

        metadata.outputs.forEach(output =>
        {
            let component = this._componentManager.get(id);

            output.inputs.forEach(input =>
            {
                component[`${output.outputName}Change`].subscribe(() =>
                {
                    let targetComponent = this._componentManager.get(input.nodeId);

                    targetComponent[input.inputName] = component[output.outputName];
                    targetComponent.invalidateVisuals();
                });
            });
        });
    }
}