import {Component, ChangeDetectionStrategy, ElementRef, AfterViewInit, ChangeDetectorRef, ViewChildren, QueryList, OnDestroy, Input, AfterContentInit, ContentChildren, Inject, OnInit} from "@angular/core";
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
        }
        
        .optionsDiv .optionDiv
        {
            padding: 3px 6px;
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
            let optionsDiv = this.optionsDiv.first;

            if(optionsDiv)
            {
                this.optionsDivStyle = positions(optionsDiv.nativeElement, this.optionsCoordinates, this._element.nativeElement, this.selectCoordinates);
                optionsDiv.nativeElement.style.width = `${this._element.nativeElement.clientWidth}px`;
            }

            this._changeDetector.detectChanges();    
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
    }

    //######################### public methods - template bindings #########################

    //######################### private methods #########################

    /**
     * Handles click outside of select element
     * @param event Mouse event object
     */
    private _handleClickOutside = (event: MouseEvent) =>
    {
        if(this._element.nativeElement != event.target && !isDescendant(this._element.nativeElement, event.target))
        {
            this.optionsDivVisible = false;

            this._changeDetector.detectChanges();
        }
    }
}

/**
 * 
 * @param parent Parent
 * @param child Child 
 */
function isDescendant(parent, child) 
{
    var node = child.parentNode;

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