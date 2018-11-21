import {ComponentRef, Directive, Input, NgModuleRef, OnChanges, OnDestroy, SimpleChanges, ViewContainerRef, Injector, Output, EventEmitter} from '@angular/core';
import {nameof} from '@asseco/common';

import {DynamicModule, ComponentLoader} from '../../../ngDynamic-core';

/**
* Creates dynamically instance of component by its dynamicModule used for layout designer
*/
@Directive(
{
    selector: '[designerComponentRenderer]',
    exportAs: 'designerComponentRenderer'
})
export class DesignerComponentRendererDirective<TComponent> implements OnChanges, OnDestroy
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
     * Loaded module that should be rendered
     */
    @Input('designerComponentRenderer')
    public dynamicModule: DynamicModule;

    /**
     * Custom injector used as parent for dynamic components tree
     */
    @Input('designerComponentRendererInjector')
    public customInjector: Injector;

    //######################### public properties - outputs #########################

    /**
     * Occurs when component is created or destroyed, it can send instance of component, or null
     */
    @Output()
    public designerComponentRendererCreated: EventEmitter<TComponent|null> = new EventEmitter<TComponent|null>();

    //######################### public properties #########################

    /**
     * Instance of dynamically created component
     */
    public get component(): TComponent|null
    {
        if(!this._componentRef)
        {
            return null;
        }

        return this._componentRef.instance;
    }

    //######################### constructor #########################
    constructor(private _viewContainerRef: ViewContainerRef)
    {
    }

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public async ngOnChanges(changes: SimpleChanges)
    {
        this._viewContainerRef.clear();
        this.ngOnDestroy();

        if(nameof<DesignerComponentRendererDirective<TComponent>>('dynamicModule') in changes && changes[nameof<DesignerComponentRendererDirective<TComponent>>('dynamicModule')].currentValue)
        {
            let injector = this.customInjector || this._viewContainerRef.parentInjector;
            let resolved = await ComponentLoader.resolveComponentFactory(this.dynamicModule, injector, 'for-designer');

            if(!resolved)
            {
                this._componentRef = null;
                this.designerComponentRendererCreated.emit(null);        

                return;
            }

            this._moduleRef = resolved.module;
            this._componentRef = this._viewContainerRef.createComponent(resolved.factory, this._viewContainerRef.length, injector) as any;
            this.designerComponentRendererCreated.emit(this.component);
            
            return;
        }
        
        this._componentRef = null;
        this.designerComponentRendererCreated.emit(null);
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
            this._moduleRef = null;
        }
    }
}
