import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

import {StackComponentOptions} from "../../stack.interface";
import {PlaceholderBaseComponent, OptionsService, ComponentMetadata} from "../../../../../../ngDynamic-designer";
import {DynamicComponentMetadataGeneric} from "../../../../../../ngDynamic-core";
import {PackageLoader} from "../../../../../../ngDynamic-designer/packageLoader";

//TODO drop metodu by bolo vhodne prehodit do PlaceholderBaseComponent

/**
 * Stack designer layout component used for designing components
 */
@Component(
{
    selector: 'stack-layout-designer-component',
    templateUrl: 'stackDesigner.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackDesignerComponent extends PlaceholderBaseComponent<StackComponentOptions>
{
    //######################### public properties #########################

    /**
     * Layout metadata that will be used for rendering
     */
    public get metadata(): DynamicComponentMetadataGeneric<StackComponentOptions>
    {
        this._metadata.options = this.transformPropertiesToOptions();
        this._metadata.options.children = this.children.map(child => child.metadata);

        return this._metadata;
    }

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                packageLoader: PackageLoader,
                optionsSvc: OptionsService)
    {
        super(changeDetector, packageLoader, optionsSvc);

        this._isContainer = true;
    }

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        super.invalidateVisuals();
    }

    /**
     * Callback after metadata was set
     */
    protected async afterMetadataSet(): Promise<void> 
    {
        if (this._metadata &&
            this._metadata.options &&
            this._metadata.options.children)
        {
            for (let child of this._metadata.options.children)
            {
                await this.addChild(child);
            }
        }
    }
    
    /**
     * Drops item on desired position
     * @param dragDrop drag data with component information
     */
    public async drop(dragDrop: CdkDragDrop<any, any>)
    {
        if (!dragDrop ||
            !dragDrop.item ||
            !dragDrop.item.data)
        {
            return;
        }

        if (dragDrop &&
            dragDrop.previousContainer == dragDrop.container)
        {
            if (dragDrop.previousIndex == dragDrop.currentIndex)
            {
                return;
            }

            moveItemInArray(this.childrenData, dragDrop.previousIndex, dragDrop.currentIndex);
            this.invalidateVisuals();
            return;
        }

        let componentMetadata: ComponentMetadata = dragDrop.item.data;

        console.log(dragDrop.currentIndex);

        this.addChildMetadata(
            {
                packageName: componentMetadata.packageName,
                componentName: componentMetadata.componentName,
                designerMetadata: await this._packageLoader.getComponentsMetadata(componentMetadata.packageName, componentMetadata.componentName),
                componentMetadata: null
            },
            dragDrop.currentIndex
        );   
    }
}