import {Directive, HostListener, ElementRef, HostBinding, EventEmitter, Output, Input} from "@angular/core";
import {isPresent} from "@asseco/common";

import {DropEvent, DropArea} from "../../interfaces";

//TODO
/**
 * - Rozlisit ci sa jedna o horizontalne alebo vertikalne pozicovanie
 */

const EVENT_COUNTER_RESET_VALUE = 15;

/**
 * Directive used for handling drag events over html element
 */
@Directive(
    {
        selector: '[droppable]'
    }
)
export class DroppableDirective
{
    //######################### private properties #########################

    /**
     * Indicates how many times have been dragover event called
     */
    private _eventCounter: number = null;

    /**
     * Name of actual dropArea i.e. top/left/bottom/right
     */
    private _dropArea: DropArea;

    //######################### public properties - inputs #########################

    /**
     * Orientation in which drop is handled
     */
    @Input('dropOrientation')
    public orientation: 'horizontal'|'vertical' = 'vertical';

    //######################### public properties - outputs #########################

    /**
     * Occurs when user drop something over element
     */
    @Output() 
    public dropped = new EventEmitter<DropEvent>();

    //######################### public properties - host #########################

    /**
     * Sets class on element based on dropArea
     */
    @HostBinding('class')
    public cssClass: string = "";

    //######################### constructor #########################

    constructor(private _element: ElementRef<HTMLElement>)
    {
    }

    //######################### public methods - host #########################

    /**
     * Handles `dragover` event on this element
     */
    @HostListener('dragover', ['$event'])
    public dragOver(event: DragEvent)
    {
        event.preventDefault();
        event.stopPropagation();

        if (isPresent(this._eventCounter) &&
            this._eventCounter < EVENT_COUNTER_RESET_VALUE)
        {
            this._eventCounter++;
            return;
        }
        
        this._eventCounter = 0;
        this._calculateActualPosition(event.clientX, event.clientY);
    }

    /**
     * Handles `dragleave` event on this element
     */
    @HostListener('dragleave', ['$event'])
    public dragLeave(event: DragEvent)
    {
        this.cssClass = '';
    }

    /**
     * Handles `drop` event on this element
     */
    @HostListener('drop', ['$event'])
    public drop(event: DragEvent)
    {
        this.dropped.emit(
            {
                dropArea: this._dropArea,
                dragEvent: event
            });
        this.cssClass = '';
        this._dropArea = null;

    }

    //######################### private methods #########################

    /**
     * Calculate actual dropArea from mouse position
     * @param mouseX 
     * @param mouseY 
     */
    private _calculateActualPosition(mouseX: number, mouseY: number)
    {
        let elementRect: ClientRect = this._element.nativeElement.getBoundingClientRect();

        switch (this.orientation)
        {
            case 'vertical':
                let mousePosPercent_Y = ((mouseY-elementRect.top) /(elementRect.bottom-elementRect.top))*100;
                if (mousePosPercent_Y < 50)
                {
                    this.cssClass = 'drop-vertical-before';
                    this._dropArea = DropArea.TOP;
                }
                else
                {
                    this.cssClass = 'drop-vertical-after';
                    this._dropArea = DropArea.BOTTOM;
                };
                break;
            case 'horizontal':
                let mousePosPercent_X = ((mouseX-elementRect.left) /(elementRect.right-elementRect.left))*100;
                if (mousePosPercent_X < 50)
                {
                    this.cssClass = 'drop-horizontal-before';
                    this._dropArea = DropArea.LEFT;
                }
                else
                {
                    this.cssClass = 'drop-horizontal-after';
                    this._dropArea = DropArea.RIGHT;
                };
                break;
            default:
                break;
        }
    }
}