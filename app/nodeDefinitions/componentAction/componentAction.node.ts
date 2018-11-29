import {Injector} from "@angular/core";

import {ActionDescription} from "./componentAction.interface";
import {NodeDefinitionGeneric, ComponentManager} from "../../ngDynamic-core";

/**
 * Node used for invoking action on some component (calling method)
 */
export class ComponentActionNode implements NodeDefinitionGeneric<any>
{
    //######################### private fields #########################

    /**
     * Instance of component manager
     */
    private _componentManager: ComponentManager;

    //######################### public properties #########################

    /**
     * Options for node
     */
    public options: any;

    /**
     * Trigger array for invoking actions on components
     */
    public trigger?: ActionDescription[];

    //######################### constructor #########################
    constructor(injector: Injector)
    {
        this._componentManager = injector.get(ComponentManager);
    }

    //######################### public methods #########################

    /**
     * Destroys everything that should be destroyed and frees memory
     */
    public destroy(): void
    {
    }

    /**
     * Explicitly runs invalidation of content (change detection)
     * @param _propertyName Name of property that has changed
     * @param initial Indication whether is invalidation initial, or on event
     */
    public invalidateVisuals(_propertyName?: string, initial?: boolean): void
    {
        if(!initial)
        {
            if(this.trigger && this.trigger.length)
            {
                this.trigger.forEach(trigger =>
                {
                    let component = this._componentManager.get(trigger.componentId);

                    if(!component)
                    {
                        return;
                    }

                    component[trigger.actionName](trigger.value);
                });
            }
        }
    }
}