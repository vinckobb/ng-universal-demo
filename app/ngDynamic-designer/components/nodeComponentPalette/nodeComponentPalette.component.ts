import {Component, ChangeDetectionStrategy, EventEmitter, Output, OnDestroy, IterableDiffer, IterableDiffers, ChangeDetectorRef} from "@angular/core";
import {Subscription} from "rxjs";

import {ComponentsService} from "../../services";
import {DesignerDynamicComponent} from "../../interfaces";

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
    private _iterableDiffer: IterableDiffer<DesignerDynamicComponent>;

    //######################### public properties - template bindings #########################

    /**
     * Array of components that are available for adding to node designer
     */
    public availableComponents: DesignerDynamicComponent[] = [];

    //######################### public properties - outputs #########################

    /**
     * Occurs when user is dragging component from palette
     */
    @Output()
    public dragging: EventEmitter<boolean> = new EventEmitter<boolean>();

    //######################### constructor #########################
    constructor(private _componentSvc: ComponentsService,
                private _changeDetector: ChangeDetectorRef,
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
            changes.forEachAddedItem(added => this.availableComponents.push(added.item));
            // changes.forEachIdentityChange(changed => console.log('changes', changed));

            this._changeDetector.detectChanges();
        }
    }
}