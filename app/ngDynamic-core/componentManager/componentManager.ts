import {ComponentRelationManager} from "../componentRelationManager";
import {DynamicComponent} from "../interfaces";

/**
 * Manager used for handling instances of components
 */
export class ComponentManager<TComponent extends DynamicComponent<any>>
{
    //######################### private fields #########################

    /**
     * Registered components
     */
    private _components: {[id: string]: TComponent} = {};

    //######################### constructor #########################
    constructor(private _relationManager: ComponentRelationManager<TComponent>)
    {
    }

    //######################### public methods #########################

    /**
     * Registers newly created component
     * @param id Id of component to be registered
     * @param component Component metadata with instance of component
     */
    public registerComponent(id: string, component: TComponent)
    {
        if(this._components[id])
        {
            throw new Error(`Component with id '${id}' has duplicate, provide unique id.`);
        }

        this._components[id] = component;
        this._relationManager.updateRelations(id, component);
    }

    /**
     * Gets component instance or null
     * @param id Unique identification of component
     */
    public get(id: string): TComponent
    {
        return this._components[id];
    }
}