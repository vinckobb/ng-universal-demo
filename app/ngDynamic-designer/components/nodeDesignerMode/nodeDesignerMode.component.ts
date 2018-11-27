import {Component, ChangeDetectionStrategy, HostBinding, ViewChild} from "@angular/core";
import {NodeDesignerComponent} from "../nodeDesigner/nodeDesigner.component";

/**
 * Component used for displaying node designer mode
 */
@Component(
{
    selector: 'node-designer-mode',
    templateUrl: 'nodeDesignerMode.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: 
    [`
        main
        {
            padding: 0;
            height: 100%;
        }
    `]
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

    //######################### public properties - host bindings #########################

    /**
     * Display css property for this component
     */
    @HostBinding('style.display')
    public componentStyleDisplay: string = "contents";

    //######################### public methods - template bidings #########################

    public drop(event: DragEvent)
    {
        event.preventDefault();

        if(event.dataTransfer.getData('text/plain') != 'mojasomarina')
        {
            return;
        }

        this.nodeDesigner.addComponent(
        {
            x: event.layerX,
            y: event.layerY
        });
    }

    public dragOverSplit(event: DragEvent)
    {
        event.preventDefault();
        event.stopPropagation();
    }
}