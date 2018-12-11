import {Directive, HostListener, ElementRef, EventEmitter, Output, Input} from "@angular/core";
import {isPresent} from "@asseco/common";

import {DropEvent, DropArea} from "../../interfaces";

//TODO
/**
 * - Rozlisit ci sa jedna o horizontalne alebo vertikalne pozicovanie
 */

const EVENT_COUNTER_RESET_VALUE = 15;
const DROP_CSS_CLASSES = ['drop', 'drop-vertical-before', 'drop-vertical-after', 'drop-horizontal-before', 'drop-horizontal-after'];

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
        this._setCssClass(null);
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
        this._setCssClass(null);
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

        //TODO optimalizovat zbytocne prepocitavanie a nastavovanie css classy ak sa nic nemeni
        switch (this.orientation)
        {
            case 'vertical':
                let mousePosPercent_Y = ((mouseY-elementRect.top) /(elementRect.bottom-elementRect.top))*100;
                if (mousePosPercent_Y < 50)
                {
                    this._setCssClass(['drop-vertical-before', 'drop']);
                    this._dropArea = DropArea.TOP;
                }
                else
                {
                    this._setCssClass(['drop-vertical-after', 'drop']);
                    this._dropArea = DropArea.BOTTOM;
                };
                break;
            case 'horizontal':
                let mousePosPercent_X = ((mouseX-elementRect.left) /(elementRect.right-elementRect.left))*100;
                if (mousePosPercent_X < 50)
                {
                    this._setCssClass(['drop-horizontal-before', 'drop']);
                    this._dropArea = DropArea.LEFT;
                    this._element.nativeElement.classList.remove
                }
                else
                {
                    this._setCssClass(['drop-horizontal-after', 'drop']);
                    this._dropArea = DropArea.RIGHT;
                };
                break;
            default:
                break;
        }
    }

    /**
     * Sets css classes on element
     * @param cssClass 
     */
    private _setCssClass(cssClass: string[])
    {
        this._element.nativeElement.classList.remove(...DROP_CSS_CLASSES);

        if (cssClass)
        {
            this._element.nativeElement.classList.add(...cssClass);
        }
    }
}