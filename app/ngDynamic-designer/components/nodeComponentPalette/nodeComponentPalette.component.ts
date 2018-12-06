import {Component, ChangeDetectionStrategy, EventEmitter, Output, OnDestroy, IterableDiffer, IterableDiffers, ChangeDetectorRef, OnInit} from "@angular/core";

import {ComponentsService} from "../../services";
import {DesignerLayoutPlaceholderComponent, RelationsMetadata, DesignerMetadataClass} from "../../interfaces";
import {PackageLoader} from "../../packageLoader";

/**
 * Name of transfer data for component drag
 */
export const COMPONENT_DRAG = 'component-drag';

/**
 * Name of transfer data for node drag
 */
export const NODE_DRAG = 'node-drag';

/**
 * Component used for displaying available nodes, components that can be added to node designer
 */
@Component(
{
    selector: 'node-component-palette',
    templateUrl: 'nodeComponentPalette.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['nodeComponentPalette.component.scss']
})
export class NodeComponentPaletteComponent implements OnInit, OnDestroy
{
    //######################### private fields #########################

    /**
     * Iterale differs used for finding changes in components array
     */
    private _iterableDiffer: IterableDiffer<DesignerLayoutPlaceholderComponent>;

    //######################### public properties - template bindings #########################

    /**
     * Array of node definitions for creating relations
     */
    public nodesDefinitions: RelationsMetadata[] = [];

    /**
     * Array of components that are available for adding to node designer
     */
    public availableComponents: 
    {
        component: DesignerLayoutPlaceholderComponent;
        metadata: RelationsMetadata;
    }[] = [];

    //######################### public properties #########################

    /**
     * Array of used components in node designer
     */
    public usedComponents:
    {
        component: DesignerLayoutPlaceholderComponent;
        metadata: RelationsMetadata;
    }[] = [];

    //######################### public properties - outputs #########################

    /**
     * Occurs when user is dragging component from palette
     */
    @Output()
    public dragging: EventEmitter<boolean> = new EventEmitter<boolean>();

    //######################### constructor #########################
    constructor(private _componentSvc: ComponentsService,
                private _changeDetector: ChangeDetectorRef,
                private _packageLoader: PackageLoader,
                iterableDiffers: IterableDiffers)
    {
        this._iterableDiffer = iterableDiffers.find(this._componentSvc.components || []).create((_index, component) => component.ɵId);
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public async ngOnInit()
    {
        let nodeDefinitions: {[name: string]: DesignerMetadataClass} = (await import(`../../../nodeDefinitions`)
            .catch(error =>
            {
                throw new Error(`Unable to load dynamic nodes package, missing @ngDynamic/nodeDefinitions, error '${error}'.`);
            })).nodeDefinitions as any;

        Object.keys(nodeDefinitions).forEach(key =>
        {
            let relationsMetadataClass = nodeDefinitions[key];

            if(relationsMetadataClass.ɵMetadata && relationsMetadataClass.ɵMetadata.relationsMetadata)
            {
                this.nodesDefinitions.push(relationsMetadataClass.ɵMetadata.relationsMetadata);
            }
        })

        this._changeDetector.detectChanges();
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
    }

    //######################### public methods - template bindings #########################

    /**
     * Handles drag start for components
     * @param event Javascript drag event
     * @param id Id of component being dragged
     */
    public componentDragStart(event: DragEvent, id: string)
    {
        event.dataTransfer.setData('text/plain', COMPONENT_DRAG);
        event.dataTransfer.setData('text/id', id);
        this.dragging.emit(true);
    }

    /**
     * Handles drag start for node
     * @param event Javascript drag event
     * @param id Id of component being dragged
     */
    public nodeDragStart(event: DragEvent, name: string)
    {
        event.dataTransfer.setData('text/plain', NODE_DRAG);
        event.dataTransfer.setData('text/name', name);
        this.dragging.emit(true);
    }

    /**
     * Event handler used for handling drag end for component
     */
    public dragEnd()
    {
        this.dragging.emit(false);
    }

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }

    /**
     * Updates components available for node designer
     * TODO - move this logic level up
     */
    public updateComponents()
    {
        let changes = this._iterableDiffer.diff(this._componentSvc.components);

        if(changes)
        {
            //removed existing components
            changes.forEachRemovedItem(removed =>
            {
                let component = removed.item;
                
                let found = this.availableComponents.find(itm => itm.component.ɵId == component.ɵId);

                //found available component
                if(found)
                {
                    let index = this.availableComponents.indexOf(found);
                    this.availableComponents.splice(index, 1);
                }

                found = this.usedComponents.find(itm => itm.component.ɵId == component.ɵId);

                //found used component
                if(found)
                {
                    let index = this.usedComponents.indexOf(found);
                    this.usedComponents.splice(index, 1);

                    //TODO - remove node
                }
            });

            //added new component
            changes.forEachAddedItem(async added => 
            {
                let component = added.item;
                let metadata = await this._packageLoader.getComponentsMetadata(component.packageName, component.componentName);

                if(metadata.relationsMetadata)
                {
                    this.availableComponents.push(
                    {
                        component,
                        metadata: metadata.relationsMetadata
                    });
                    
                    this._changeDetector.detectChanges();
                }
            });

            // changes.forEachIdentityChange(changed => console.log('changes', changed));

            this._changeDetector.detectChanges();
        }
    }
}