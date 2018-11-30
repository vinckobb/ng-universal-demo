import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";

import {StackComponentOptions} from "../../stack.interface";
import {PlaceholderBaseComponent, PropertiesService, DragService} from "../../../../../../ngDynamic-designer";
import {DynamicComponentMetadataGeneric} from "../../../../../../ngDynamic-core";
import {PackageLoader} from "../../../../../../ngDynamic-designer/packageLoader";
import {COMPONENT_PALETTE_ITEM} from "../../../../../../ngDynamic-designer/components";

//TODO drop metodu by bolo vhodne prehodit do PlaceholderBaseComponent

export const COMPONENT_ITEM = "component";

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
                optionsSvc: PropertiesService,
                private _dragSvc: DragService)
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

    //TODO presunut do placeholderBase metody allowDrop, dragStart, drop pripadne dalsie ktore budu suvisiet s drag and drop
    public allowDrop(event: DragEvent)
    {
        event.preventDefault();
        event.stopPropagation();
    }

    public dragStart(event: DragEvent, child: any)
    {
        event.dataTransfer.setData('text/plain', COMPONENT_ITEM);
        this._dragSvc.dragItem = child;
    }
    
    /**
     * Drops item on desired position
     * @param event drag event
     */
    public async drop(event: DragEvent)
    {
        if (event)
        {
            event.preventDefault();
            event.stopPropagation();
        }

        let dragItem = this._dragSvc.dragItem;
        let type = event.dataTransfer.getData('text/plain');
        
        if (type == COMPONENT_PALETTE_ITEM)
        {
            this.addChildMetadata(
                {
                    packageName: dragItem.packageName,
                    componentName: dragItem.componentName,
                    designerMetadata: await this._packageLoader.getComponentsMetadata(dragItem.packageName, dragItem.componentName),
                    componentMetadata: null
                }
            );  
        }
        else if (type == COMPONENT_ITEM)
        {
            this.addChildMetadata(dragItem);
        }
    }
}