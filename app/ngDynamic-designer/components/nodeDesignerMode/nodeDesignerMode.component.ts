import {Component, ChangeDetectionStrategy, ViewChild, OnDestroy, AfterViewInit} from "@angular/core";
import {Subscription} from "rxjs";

import {NodeDesignerComponent} from "../nodeDesigner/nodeDesigner.component";
import {NodeComponentPaletteComponent, COMPONENT_DRAG, NODE_DRAG} from "../nodeComponentPalette/nodeComponentPalette.component";

/**
 * Component used for displaying node designer mode
 */
@Component(
{
    selector: 'node-designer-mode',
    templateUrl: 'nodeDesignerMode.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['nodeDesignerMode.component.scss']
})
export class NodeDesignerModeComponent implements OnDestroy, AfterViewInit
{
    //######################### private fields #########################

    /**
     * Subscription for node component destruction
     */
    private _nodeComponentDestryingSubscription: Subscription;

    //######################### public properties - template bindings #########################

    /**
     * Indication whether is drop zone visible
     */
    public dropZoneVisible: boolean = false;

    //######################### public properties - children #########################

    /**
     * Node designer instance
     */
    @ViewChild(NodeDesignerComponent)
    public nodeDesigner: NodeDesignerComponent;

    /**
     * Node component palette instance
     */
    @ViewChild(NodeComponentPaletteComponent)
    public nodeComponentPallete: NodeComponentPaletteComponent;

    //######################### public methods - implementation of AfterViewInit #########################
    
    /**
     * Called when view was initialized
     */
    public ngAfterViewInit()
    {
        this._nodeComponentDestryingSubscription = this.nodeDesigner.destroyingComponentNode.subscribe(component =>
        {
            let found = this.nodeComponentPallete.usedComponents.find(itm => itm.component == component);
            let index = this.nodeComponentPallete.usedComponents.indexOf(found);
            this.nodeComponentPallete.usedComponents.splice(index, 1);
            this.nodeComponentPallete.availableComponents.push(found);
            this.nodeComponentPallete.invalidateVisuals();
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._nodeComponentDestryingSubscription)
        {
            this._nodeComponentDestryingSubscription.unsubscribe();
            this._nodeComponentDestryingSubscription = null;
        }
    }

    //######################### public methods - template bidings #########################

    /**
     * Handles drop event for adding new node into designer
     * @param event Event with drag n drop data
     */
    public drop(event: DragEvent)
    {
        event.preventDefault();

        let type = event.dataTransfer.getData('text/plain');

        //handle component drag
        if(type == COMPONENT_DRAG)
        {
            let component = this.nodeComponentPallete.availableComponents.find(itm => itm.component.id == event.dataTransfer.getData('text/id'));

            this.nodeDesigner.addComponent({
                                               x: event.layerX,
                                               y: event.layerY
                                           },
                                           component.component,
                                           component.metadata);

            let index = this.nodeComponentPallete.availableComponents.indexOf(component);
            this.nodeComponentPallete.availableComponents.splice(index, 1);
            this.nodeComponentPallete.usedComponents.push(component);
        }

        //handle node drag
        if(type == NODE_DRAG)
        {
            let node = this.nodeComponentPallete.nodesDefinitions.find(itm => itm.name == event.dataTransfer.getData('text/name'));

            this.nodeDesigner.addNode({
                                          x: event.layerX,
                                          y: event.layerY
                                      },
                                      node);
        }
    }
}