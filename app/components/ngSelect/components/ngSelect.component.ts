import {Component, ChangeDetectionStrategy, ElementRef, AfterViewInit, ChangeDetectorRef, ViewChildren, QueryList, OnDestroy, Input, AfterContentInit, ContentChildren, Inject, OnInit, HostListener} from "@angular/core";
import {DOCUMENT} from '@angular/common';
import * as positions from 'positions';

import {Subscription} from "rxjs";
import {OptionComponent} from "./option/option.component";

/**
 * Component used for rendering bootstrap select
 */
@Component(
{
    selector: 'ng-select',
    templateUrl: 'ngSelect.component.html',
    styles:
    [
        `:host
        {
            display: block;
        }

        button.btn-select
        {
            display: flex;
            width: 100%;
            padding: 4px 0px 4px 4px;
        }

        button.btn-select .selected-value
        {
            flex: 1;
            text-align: left;
        }

        button.btn-select .selected-caret
        {
            flex: 0 0 20px;
            align-self: center;
        }

        .optionsDiv
        {
            z-index: 250;
            background-color: #FFFFFF;
            border-radius: 4px;
            border: 1px solid #BBBBBB;
            overflow: auto;
        }

        .optionsDiv a.option
        {
            color: inherit;
        }

        .optionsDiv a.option:hover,
        .optionsDiv a.option:active, 
        .optionsDiv a.option:focus
        {
            text-decoration: none;
            outline: none;
        }

        .optionsDiv .optionDiv
        {
            padding: 3px 6px;
        }

        .optionsDiv a.option.active .optionDiv
        {
            background-color: #BBBBBB;
        }

        .optionsDiv a.option:hover .optionDiv
        {
            background-color: #E0E0E0;
        }`
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgSelectComponent implements AfterViewInit, OnDestroy, AfterContentInit, OnInit
{
    //######################### private fields #########################

    /**
     * Subscription for changes of visibility of optionsDiv
     */
    private _optionsDivVisibleSubscription: Subscription;

    /**
     * Subscription for changes of available options
     */
    private _optionsChildrenSubscription: Subscription;

    //######################### public properties - inputs #########################

    /**
     * Coordinates of options pop relative to select
     */
    @Input()
    public optionsCoordinates: Positions.PositionsCoordinates = 'top left';

    /**
     * Coordinates of select relative to options
     */
    @Input()
    public selectCoordinates: Positions.PositionsCoordinates = 'bottom left';

    //######################### public properties - template bindings #########################

    /**
     * Currently selected value
     */
    public value: any;

    /**
     * Indication whether is options div visible
     * @internal
     */
    public optionsDivVisible: boolean = false;

    /**
     * Computed coordinates of optionsDiv
     * @internal
     */
    public optionsDivStyle: Positions.PositionsCss = {};

    /**
     * Array of available options
     */
    public options: OptionComponent[] = [];

    //######################### public properties - children #########################

    /**
     * Element with options
     * @internal
     */
    @ViewChildren('optionsDiv')
    public optionsDiv: QueryList<ElementRef<HTMLDivElement>>;

    /**
     * Available options
     */
    @ContentChildren(OptionComponent)
    public optionsChildren: QueryList<OptionComponent>;

    //######################### constructor #########################
    constructor(private _element: ElementRef<HTMLElement>,
                private _changeDetector: ChangeDetectorRef,
                @Inject(DOCUMENT) private _document: HTMLDocument)
    {
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit()
    {
        this._document.addEventListener('mouseup', this._handleClickOutside);
        window.addEventListener('resize', this._handleResizeAndScroll);
        window.addEventListener('scroll', this._handleResizeAndScroll);
    }

    //######################### public methods - implementation of AfterViewInit #########################

    /**
     * Called when view was initialized
     * @internal
     */
    public ngAfterViewInit()
    {
        this._optionsDivVisibleSubscription = this.optionsDiv.changes.subscribe(() =>
        {
            this._calculatePositionAndDimensions();
        });
    }

    //######################### public methods - implementation of AfterContentInit #########################

    /**
     * Called when content was initialized
     */
    public ngAfterContentInit()
    {
        this._optionsChildrenSubscription = this.optionsChildren.changes.subscribe(() =>
        {
            this.options = this.optionsChildren.toArray();

            this._changeDetector.detectChanges();
        });

        this.options = this.optionsChildren.toArray();
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._optionsDivVisibleSubscription)
        {
            this._optionsDivVisibleSubscription.unsubscribe();
            this._optionsDivVisibleSubscription = null;
        }

        if(this._optionsChildrenSubscription)
        {
            this._optionsChildrenSubscription.unsubscribe();
            this._optionsChildrenSubscription = null;
        }

        this._document.removeEventListener('mouseup', this._handleClickOutside);
        window.removeEventListener('resize', this._handleResizeAndScroll);
        window.removeEventListener('scroll', this._handleResizeAndScroll);
    }

    //######################### public methods - template bindings #########################

    //######################### public methods - host #########################

    /**
     * Handles keyboard events
     * @param event Keyboard event
     * @internal
     */
    @HostListener('keypress', ['$event'])
    public handleKeyboard(event: KeyboardEvent)
    {
        if(event.key == "ArrowDown" || event.key == "Tab")
        {
            

            event.preventDefault();
        }

        if(event.key == "ArrowUp")
        {


            event.preventDefault();
        }
    }

    //######################### private methods #########################

    /**
     * Handles resize event
     */
    private _handleResizeAndScroll = () =>
    {
        this._calculatePositionAndDimensions();
    };

    /**
     * Handles click outside of select element
     * @param event Mouse event object
     */
    private _handleClickOutside = (event: MouseEvent) =>
    {
        if(this._element.nativeElement != event.target && !isDescendant(this._element.nativeElement, event.target as HTMLElement))
        {
            this.optionsDivVisible = false;

            this._changeDetector.detectChanges();
        }
    }

    /**
     * Calculates positions and dimensions of popup
     */
    private _calculatePositionAndDimensions()
    {
        let optionsDiv = this.optionsDiv.first;

        if(optionsDiv)
        {
            optionsDiv.nativeElement.style.minWidth = `${this._element.nativeElement.clientWidth}px`;

            this.optionsDivStyle = positions(optionsDiv.nativeElement, this.optionsCoordinates, this._element.nativeElement, this.selectCoordinates);
            this._changeDetector.detectChanges();

            this.optionsDivStyle = this._flipIfCollision(optionsDiv.nativeElement);
            this._changeDetector.detectChanges();

            if(this._updateHeight(optionsDiv.nativeElement))
            {
                this.optionsDivStyle = this._flipIfCollision(optionsDiv.nativeElement);
                this._changeDetector.detectChanges();
            }
        }
    }

    /**
     * Updates height of element
     * @param optionsDiv Html element for options div
     */
    private _updateHeight(optionsDiv: HTMLElement): boolean
    {
        let rect = optionsDiv.getBoundingClientRect(),
            selectRect = this._element.nativeElement.getBoundingClientRect(),
            h = Math.max(this._document.documentElement.clientHeight, window.innerHeight || 0);

        //options are above
        if(rect.top < selectRect.top)
        {
            //space above is not enough
            if(selectRect.top < rect.height)
            {
                optionsDiv.style.maxHeight = `${selectRect.top - 2}px`;

                return true;
            }
            else
            {
                optionsDiv.style.maxHeight = '';

                return false;
            }
        }
        //options are below
        else
        {
            //space below is not enough
            if(h - selectRect.bottom < rect.height)
            {
                optionsDiv.style.maxHeight = `${h - selectRect.bottom - 2}px`;

                return true;
            }
            else
            {
                optionsDiv.style.maxHeight = '';

                return false;
            }
        }
    }

    /**
     * Flips html element position if collision occur
     * @param optionsDiv Html element to be flipped if collisions occur
     */
    private _flipIfCollision(optionsDiv: HTMLElement): Positions.PositionsCss
    {
        let w = Math.max(this._document.documentElement.clientWidth, window.innerWidth || 0),
            h = Math.max(this._document.documentElement.clientHeight, window.innerHeight || 0),
            rect = optionsDiv.getBoundingClientRect(),
            selectRect = this._element.nativeElement.getBoundingClientRect(),
            spaceAbove = selectRect.top,
            spaceUnder = h - selectRect.bottom,
            spaceBefore = selectRect.left,
            spaceAfter = w - selectRect.right,
            optionsCoordinates = this.optionsCoordinates,
            selectCoordinates = this.selectCoordinates;

        //vertical overflow
        if((h < (rect.top + rect.height) &&
            spaceUnder < spaceAbove) ||
           (rect.top < 0 &&
            spaceAbove < spaceUnder))
        {
            optionsCoordinates = this._flipVertiacal(optionsCoordinates);
            selectCoordinates = this._flipVertiacal(selectCoordinates);
        }

        //horizontal overflow
        if((w < (rect.left + rect.width) &&
            spaceAfter < spaceBefore) ||
           (rect.left < 0 &&
            spaceBefore < spaceAfter))
        {
            optionsCoordinates = this._flipHorizontal(optionsCoordinates);
            selectCoordinates = this._flipHorizontal(selectCoordinates);
        }

        return positions(optionsDiv, optionsCoordinates, this._element.nativeElement, selectCoordinates);
    }

    /**
     * Flips vertical position
     * @param position Position to be flipped vertically
     */
    private _flipVertiacal(position: Positions.PositionsCoordinates): Positions.PositionsCoordinates
    {
        if(position.indexOf('top') >= 0)
        {
            return position.replace('top', 'bottom') as Positions.PositionsCoordinates;
        }
        else if(position.indexOf('bottom') >= 0)
        {
            return position.replace('bottom', 'top') as Positions.PositionsCoordinates;
        }

        return position;
    }

    /**
     * Flips horizontal position
     * @param position Position to be flipped horizontally
     */
    private _flipHorizontal(position: Positions.PositionsCoordinates): Positions.PositionsCoordinates
    {
        if(position.indexOf('right') >= 0)
        {
            return position.replace('right', 'left') as Positions.PositionsCoordinates;
        }
        else if(position.indexOf('left') >= 0)
        {
            return position.replace('left', 'right') as Positions.PositionsCoordinates;
        }

        return position;
    }
}

/**
 * Gets indication whether is child descendand of parent
 * @param parent Parent to be tested
 * @param child Child to be looked for
 */
function isDescendant(parent: HTMLElement, child: HTMLElement): boolean
{
    let node = child.parentNode;

    while (node != null)
    {
        if (node == parent)
        {
            return true;
        }

        node = node.parentNode;
    }

    return false;
}

// /**
//  * Computes offset of element against document
//  * @param element Html element which offset is counted
//  * @param doc Html document to be used for extracting scroll offset
//  */
// function offset(element: HTMLElement, doc?: HTMLDocument)
// {
//     doc = doc || document;

//     let rect = element.getBoundingClientRect(),
//         scrollLeft = window.pageXOffset || doc.documentElement.scrollLeft,
//         scrollTop = window.pageYOffset || doc.documentElement.scrollTop;

//     return {
//         top: rect.top + scrollTop,
//         left: rect.left + scrollLeft,
//         bottom: rect.top + scrollTop + rect.height,
//         right: rect.left + scrollLeft + rect.width
//     };
// }