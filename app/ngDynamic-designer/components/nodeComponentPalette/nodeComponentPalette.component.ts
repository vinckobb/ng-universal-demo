import {Component, ChangeDetectionStrategy, EventEmitter, Output} from "@angular/core";

/**
 * Component used for displaying available nodes, components that can be added to node designer
 */
@Component(
{
    selector: 'node-component-palette',
    templateUrl: 'nodeComponentPalette.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles:
    [
        `:host
        {
            display: block;
        }`
    ]
})
export class NodeComponentPaletteComponent
{
    //######################### public properties - outputs #########################

    /**
     * Occurs when user is dragging component from palette
     */
    @Output()
    public dragging: EventEmitter<boolean> = new EventEmitter<boolean>();

    //######################### public methods - template bindings #########################

    public dragStart(event)
    {
        event.dataTransfer.setData('text/plain', 'mojasomarina');
        this.dragging.emit(true);
    }

    /**
     * Event handler used for handling drag end
     * @param {DragEvent} event Event for dragging
     */
    public dragEnd()
    {
        this.dragging.emit(false);
    }
}