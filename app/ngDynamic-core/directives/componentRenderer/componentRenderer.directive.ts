import {ComponentRef, Directive, Input, NgModuleRef, OnChanges, OnDestroy, SimpleChanges, ViewContainerRef, Injector} from '@angular/core';

import {ComponentLoader} from '../../componentLoader';
import {DynamicComponent, DynamicComponentMetadata} from '../../interfaces';
import {ComponentManager} from '../../componentManager';

/**
* Creates dynamically instance of component by its metadata
*/
@Directive(
{
    selector: '[componentRenderer]',
    exportAs: 'componentRenderer'
})
export class ComponentRendererDirective<TComponent extends DynamicComponent<any>> implements OnChanges, OnDestroy
{
    //######################### private fields #########################

    /**
     * Created component reference
     */
    private _componentRef: ComponentRef<TComponent>|null = null;

    /**
     * Created custom module reference
     */
    private _moduleRef: NgModuleRef<any>|null = null;

    //######################### public properties - inputs #########################

    /**
     * Type that should be dynamically created into current container
     */
    @Input('componentRenderer')
    public componentMetadata: DynamicComponentMetadata<any>;

    /**
     * Custom injector used as parent for dynamic components tree
     */
    @Input('componentRendererInjector')
    public customInjector: Injector;

    //######################### private properties #########################

    /**
     * Instance of dynamically created component
     */
    private get component(): TComponent|null
    {
        if(!this._componentRef)
        {
            return null;
        }

        return this._componentRef.instance;
    }

    //######################### constructor #########################
    constructor(private _viewContainerRef: ViewContainerRef,
                private _componentLoader: ComponentLoader)
    {
    }

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public async ngOnChanges(changes: SimpleChanges)
    {
        this._viewContainerRef.clear();
        this._componentRef = null;

        if(this.componentMetadata)
        {
            let injector = this.customInjector || this._viewContainerRef.parentInjector;
            let componentManager = injector.get(ComponentManager);

            if (this._moduleRef)
            {
                this._moduleRef.destroy();
                this._moduleRef = null;
            }

            let resolved = await this._componentLoader.resolveComponentFactory<TComponent>(this.componentMetadata, injector);

            if(!resolved)
            {
                this._componentRef = null;

                return;
            }

            this._moduleRef = resolved.module;
            this._componentRef = this._viewContainerRef.createComponent<TComponent>(resolved.factory, this._viewContainerRef.length, injector);
            
            this.component.options = this.componentMetadata.options;
            this.component.invalidateVisuals();
            
            componentManager.registerComponent(this.componentMetadata.id, this.component);
        }
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if (this._moduleRef)
        {
            this._moduleRef.destroy();
        }
    }
}
