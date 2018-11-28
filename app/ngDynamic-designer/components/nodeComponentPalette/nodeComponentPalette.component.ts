import {Component, ChangeDetectionStrategy, EventEmitter, Output, OnDestroy, IterableDiffer, IterableDiffers, ChangeDetectorRef} from "@angular/core";
import {Subscription} from "rxjs";

import {ComponentsService} from "../../services";
import {DesignerLayoutPlaceholderComponent, RelationsMetadata} from "../../interfaces";
import {PackageLoader} from "../../packageLoader";

/**
 * Name of transfer data for component drag
 */
export const COMPONENT_DRAG = 'component-drag';

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
export class NodeComponentPaletteComponent implements OnDestroy
{
    //######################### private fields #########################

    /**
     * Subscription for changes of registered components
     */
    private _componentsChangeSubscription: Subscription;

    /**
     * Iterale differs used for finding changes in components array
     */
    private _iterableDiffer: IterableDiffer<DesignerLayoutPlaceholderComponent>;

    //######################### public properties - template bindings #########################

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
        this._componentsChangeSubscription = this._componentSvc.componentsChange.subscribe(() => this._handleComponents());
        this._iterableDiffer = iterableDiffers.find(this._componentSvc.components || []).create();

        this._handleComponents();
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._componentsChangeSubscription)
        {
            this._componentsChangeSubscription.unsubscribe();
            this._componentsChangeSubscription = null;
        }
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
     * Event handler used for handling drag end for component
     */
    public componentDragEnd()
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

    //######################### private methods #########################

    /**
     * Handles component changes and initialization
     */
    private _handleComponents()
    {
        let changes = this._iterableDiffer.diff(this._componentSvc.components);

        //initial setup
        if(!changes)
        {

        }
        else
        {
            // changes.forEachRemovedItem(removed => console.log('removed', removed));
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
        }
    }
}