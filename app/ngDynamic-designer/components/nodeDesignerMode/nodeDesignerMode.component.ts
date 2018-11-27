import {Component, ChangeDetectionStrategy, ViewChild} from "@angular/core";

import {NodeDesignerComponent} from "../nodeDesigner/nodeDesigner.component";
import {NodeComponentPaletteComponent, COMPONENT_DRAG} from "../nodeComponentPalette/nodeComponentPalette.component";
import {PackageLoader} from "../../packageLoader";

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

    //######################### constructor #########################
    constructor(private _packageLoader: PackageLoader)
    {
    }

    //######################### public methods - template bidings #########################

    /**
     * Handles drop event for adding new node into designer
     * @param event Event with drag n drop data
     */
    public async drop(event: DragEvent)
    {
        event.preventDefault();

        let type = event.dataTransfer.getData('text/plain');

        //handle component drag
        if(type == COMPONENT_DRAG)
        {
            let component = this.nodeComponentPallete.availableComponents.find(itm => itm.id == event.dataTransfer.getData('text/id'));
            let metadata = await this._packageLoader.getComponentsMetadata(component.packageName, component.componentName);

            //metadata exists
            if(metadata.relationsMetadata)
            {
                this.nodeDesigner.addComponent({
                                                   x: event.layerX,
                                                   y: event.layerY
                                               },
                                               component,
                                               metadata.relationsMetadata);
            }
        }
    }
}