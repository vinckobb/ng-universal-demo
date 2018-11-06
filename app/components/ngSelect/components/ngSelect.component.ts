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

        .optionsDiv .optionItem
        {
            padding: 3px 6px;
        }

        .optionsDiv .optionItem.active
        {
            background-color: #BBBBBB;
        }

        .optionsDiv .optionItem:hover
        {
            background-color: #E0E0E0;
        }`
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgSelectComponent<TValue> implements AfterViewInit, OnDestroy, AfterContentInit, OnInit
{
    //######################### protected fields #########################

    /**
     * Subscription for changes of visibility of optionsDiv
     */
    protected _optionsDivVisibleSubscription: Subscription;

    /**
     * Subscription for changes of available options
     */
    protected _optionsChildrenSubscription: Subscription;

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

    /**
     * Nothing selected text
     */
    @Input()
    public nothingSelectedText: string;

    /**
     * Method used for comparision of selected value and options
     */
    @Input()
    public valueComparer: (source: TValue|Array<TValue>, target: TValue) => boolean = (source, target) => source == target;

    /**
     * Method used for transforming value into string to be displayed
     */
    @Input()
    public valueSelector: (value: TValue) => string = value => value.toString();

    //######################### public properties - template bindings #########################

    /**
     * Currently selected value
     */
    public value: TValue|Array<TValue>;

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
     * @internal
     */
    public options: OptionComponent<TValue>[] = [];

    //######################### public properties - children #########################

    /**
     * Element with options
     * @internal
     */
    @ViewChildren('optionsDiv')
    public optionsDiv: QueryList<ElementRef<HTMLDivElement>>;

    /**
     * Available options
     * @internal
     */
    @ContentChildren(OptionComponent)
    public optionsChildren: QueryList<OptionComponent<TValue>>;

    //######################### constructor #########################
    constructor(protected _element: ElementRef<HTMLElement>,
                protected _changeDetector: ChangeDetectorRef,
                @Inject(DOCUMENT) protected _document: HTMLDocument)
    {
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     * @internal
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
     * @internal
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
     * @internal
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
        if(event.key == "ArrowDown")
        {
            

            event.preventDefault();
        }

        if(event.key == "ArrowUp")
        {


            event.preventDefault();
        }
    }

    /**
     * Handles keyboard events
     * @param event Keyboard event
     * @internal
     */
    @HostListener('blur', ['$event'])
    public handleBlur(event: FocusEvent)
    {
        console.log(event);
    }

    //######################### protected methods #########################

    /**
     * Handles resize event
     */
    protected _handleResizeAndScroll = () =>
    {
        this._calculatePositionAndDimensions();
    };

    /**
     * Handles click outside of select element
     * @param event Mouse event object
     */
    protected _handleClickOutside = (event: MouseEvent) =>
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
    protected _calculatePositionAndDimensions()
    {
        let optionsDiv = this.optionsDiv.first;

        if(optionsDiv)
        {
            optionsDiv.nativeElement.style.minWidth = `${this._element.nativeElement.clientWidth}px`;

            //set to default position
            this.optionsDivStyle = positions(optionsDiv.nativeElement, this.optionsCoordinates, this._element.nativeElement, this.selectCoordinates);
            this._changeDetector.detectChanges();

            //flip if collision with viewport
            this.optionsDivStyle = this._flipIfCollision(optionsDiv.nativeElement);
            this._changeDetector.detectChanges();

            //set maxHeight if there is not more place
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
    protected _updateHeight(optionsDiv: HTMLElement): boolean
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
    protected _flipIfCollision(optionsDiv: HTMLElement): Positions.PositionsCss
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
    protected _flipVertiacal(position: Positions.PositionsCoordinates): Positions.PositionsCoordinates
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
    protected _flipHorizontal(position: Positions.PositionsCoordinates): Positions.PositionsCoordinates
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