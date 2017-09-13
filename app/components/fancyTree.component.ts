import {Component, ChangeDetectionStrategy, AfterContentInit, ElementRef, Input, AfterViewChecked, ChangeDetectorRef, PLATFORM_ID, Inject, ContentChildren, QueryList} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

import {FancyTreeNodeData} from './fancyTree.interface';
import {FancyTreeNodeComponent} from './fancyTreeNode.component';

/**
 * Component used for displaying of fancytree
 */
@Component(
{
    selector: 'fancytree',
    templateUrl: 'fancyTree.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FancyTreeComponent implements AfterViewChecked, AfterContentInit
{
    //######################### private fields #########################

    /**
     * Indication that component was already initialized
     */
    private _initialized;

    /**
     * Indication whether is code running in browser
     */
    private _isBrowser: boolean = isPlatformBrowser(this._platformId);

    //######################### private properties #########################

    /**
     * Gets jquery selector for current element
     */
    private get selector(): JQuery<HTMLElement>
    {
        return $(this._element.nativeElement);
    }

    /**
     * Gets instance of tree
     */
    private get tree(): Fancytree.Fancytree
    {
        return this.selector.fancytree("getTree");
    }

    //######################### public properties - inputs #########################

    /**
     * Options for fancytree
     */
    @Input()
    public options: Fancytree.FancytreeOptions;

    /**
     * Data that are displayed
     */
    @Input()
    public data: FancyTreeNodeData[];

    //######################### public properties - children #########################

    /**
     * Query list for getting content children of type FancyTreeNodeComponent
     */
    @ContentChildren(FancyTreeNodeComponent)
    public dataQuery: QueryList<FancyTreeNodeComponent>;

    //######################### constructor #########################
    constructor(private _element: ElementRef,
                private _changeDetector: ChangeDetectorRef,
                @Inject(PLATFORM_ID) private _platformId: Object)
    {
    }

    //######################### public methods - implementation of AfterContentInit #########################
    
    /**
     * Called when content was initialized
     */
    public ngAfterContentInit()
    {
        this.dataQuery
            .changes
            .subscribe((changes: QueryList<FancyTreeNodeComponent>) => this.data = this.dataQuery.toArray());

        this.data = this.dataQuery.toArray();
    }

    //######################### public methods - implementation of AfterViewChecked #########################
    
    /**
     * Called when view was checked
     */
    public async ngAfterViewChecked()
    {
        if(!this._initialized && this._isBrowser)
        {
            if(this.options.extensions)
            {
                await Promise.all(this.options.extensions.map(async extension =>
                {
                    await import(`jquery.fancytree/jquery.fancytree.${extension}`);
                }));
            }

            this.selector.fancytree(this.options);

            this._initialized = true;
        }
    }

    //######################### public methods #########################

    /**
     * Invalidates visuals of component by running change detection
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }
}