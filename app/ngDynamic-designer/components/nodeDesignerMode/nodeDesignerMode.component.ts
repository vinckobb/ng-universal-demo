import {Component, ChangeDetectionStrategy, ViewChild} from "@angular/core";

import {NodeDesignerComponent} from "../nodeDesigner/nodeDesigner.component";
import {NodeComponentPaletteComponent, COMPONENT_DRAG} from "../nodeComponentPalette/nodeComponentPalette.component";

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
export class NodeDesignerModeComponent
{
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
    }
}