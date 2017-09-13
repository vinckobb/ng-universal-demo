import {Component, ChangeDetectionStrategy, AfterContentInit, ElementRef, Input, AfterViewChecked, ChangeDetectorRef, PLATFORM_ID, Inject, ContentChildren, QueryList, OnDestroy} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {isBlank} from '@ng/common';
import {Subscription} from 'rxjs/Subscription';

import {FancyTreeNodeData} from './fancyTree.interface';
import {FancyTreeNodeComponent} from './fancyTreeNode.component';

/**
 * Component used for displaying of fancytree
 */
@Component(
{
    selector: 'fancytree',
    template:
   `<ul style="display: none;">
        <li *ngFor="let node of data" [fancytree-node-renderer]="node"></li>
    </ul>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FancyTreeComponent implements AfterViewChecked, AfterContentInit, OnDestroy
{
    //######################### private fields #########################

    /**
     * Subscription for changes in nodes in content
     */
    private _nodeQuerySubscription: Subscription;

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

    //######################### public properties  #########################

    /**
     * Gets instance of tree
     */
    public get tree(): Fancytree.Fancytree
    {
        return this.selector.fancytree("getTree");
    }

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
    public ngAfterContentInit(): void
    {
        if(isBlank(this.data))
        {
            this._nodeQuerySubscription = this.dataQuery
                .changes
                .subscribe((changes: QueryList<FancyTreeNodeComponent>) => this.data = this.dataQuery.toArray());

            this.data = this.dataQuery.toArray();
        }
    }

    //######################### public methods - implementation of AfterViewChecked #########################
    
    /**
     * Called when view was checked
     */
    public async ngAfterViewChecked()
    {
        if(!this._isBrowser)
        {
            return;
        }

        if(!this._initialized)
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

            return;
        }

        setTimeout(() => this.tree.reload(), 10);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        if(this._nodeQuerySubscription)
        {
            this._nodeQuerySubscription.unsubscribe();
            this._nodeQuerySubscription = null;
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