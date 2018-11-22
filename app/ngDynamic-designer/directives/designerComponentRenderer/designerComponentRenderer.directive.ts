import {ComponentRef, Directive, Input, NgModuleRef, OnChanges, OnDestroy, SimpleChanges, ViewContainerRef, Injector} from '@angular/core';
import {nameof, generateId} from '@asseco/common';

import {ComponentLoader} from '../../../ngDynamic-core';
import {DesignerDynamicComponent, DesignerComponentRendererData} from '../../interfaces';

/**
* Creates dynamically instance of component by its dynamicModule used for layout designer
*/
@Directive(
{
    selector: '[designerComponentRenderer]',
    exportAs: 'designerComponentRenderer'
})
export class DesignerComponentRendererDirective<TComponent extends DesignerDynamicComponent> implements OnChanges, OnDestroy
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
    public componentMetadata: DesignerComponentRendererData;

    /**
     * Custom injector used as parent for dynamic components tree
     */
    @Input('designerComponentRendererInjector')
    public customInjector: Injector;

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

        if(nameof<DesignerComponentRendererDirective<TComponent>>('componentMetadata') in changes && changes[nameof<DesignerComponentRendererDirective<TComponent>>('componentMetadata')].currentValue)
        {
            let injector = this.customInjector || this._viewContainerRef.parentInjector;
            let resolved = await ComponentLoader.resolveComponentFactory(this.componentMetadata.designerMetadata.placeholderModule, injector, this.componentMetadata.componentName);

            if(!resolved)
            {
                this._componentRef = null;

                return;
            }

            this._moduleRef = resolved.module;
            this._componentRef = this._viewContainerRef.createComponent(resolved.factory, this._viewContainerRef.length, injector) as any;

            this.component.options = this.componentMetadata.designerMetadata.layoutMetadata;
            this.component.setMetadata(this.componentMetadata.componentMetadata ||
            {
                id: generateId(12),
                options: {},
                componentName: this.componentMetadata.componentName,
                componentPackage: this.componentMetadata.packageName
            });

            this.component.invalidateVisuals();

            return;
        }

        this._componentRef = null;
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
