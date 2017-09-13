import {Component, ChangeDetectionStrategy, TemplateRef, Input, ContentChild, QueryList, ContentChildren, AfterContentInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {isBlank} from '@ng/common';

import {FancyTreeNodeData} from './fancyTree.interface';

/**
 * Component used for definition of fancytree node
 */
@Component(
{
    selector: 'fancytree-node',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FancyTreeNodeComponent implements FancyTreeNodeData, AfterContentInit, OnDestroy
{
    //######################### private fields #########################

    /**
     * Subscription for children query changes
     */
    private _childrenQuerySubscription: Subscription;

    //######################### public properties - inputs, children #######################

    /**
     * Initialization only, but will not be stored with the node.
     */
    @Input()
    public active?: boolean;
    
    /**
     * Pass false to remove checkbox for this node.
     *
     * Note that selection via the API or initialization data is still possible, even
     * if no checkbox is displayed.
     *
     * undefined: Use global tree option of the same name
     *
     * true: display a checkbox
     *
     * false: hide checkbox
     *
     * "radio": display a radio button (this does not have any effect on the selection behavior)
     */
    @Input()
    public checkbox?: boolean|string;

    /**
     * Array of nested fancy tree nodes
     */
    @Input()
    public children?: FancyTreeNodeData[];

    /**
     * Query list for getting content children of type FancyTreeNodeComponent
     */
    @ContentChildren(FancyTreeNodeComponent)
    public childrenQuery?: QueryList<FancyTreeNodeComponent>;

    /**
     * Node text (may contain HTML tags). Use node.setTitle() to modify.
     */
    @Input()
    public content?: string;

    /**
     * Template that is rendered instead of title if specified
     */
    @Input()
    @ContentChild(TemplateRef)
    public contentHtml?: TemplateRef<Object>;

    /**
     * Represents dynamic data for tree node
     */
    @Input()
    public data?: Object;

    /**
     * Initial expansion state. Use node.setExpanded() or node.isExpanded() to access.
     */
    @Input()
    public expanded?: boolean;

    /**
     * Class names added to the node markup (separate with space).
     *
     * Note: use node.add/remove/toggleClass() to modify.
     */
    @Input()
    public extraClasses?: string;

    /**
     * Initialization only, but will not be stored with the node.
     */
    @Input()
    public focus?: boolean;

    /**
     * Folders have different default icons and honor the clickFolderMode option.
     */
    @Input()
    public folder?: boolean;

    /**
     * Define this node's icon.
     * 
     * undefined: Use global tree option of the same name
     * 
     * true: Use default icon, depending on node.folder and node.expanded status
     * 
     * false: Hide icon
     * 
     * String: A string value that contains a '/' or a '.' is used as src attribute for a <img> tag.
     * (See also the global imagePath option.)
     * 
     * Any other string value is used to generate custom tags, e.g. for "ui-icon ui-icon-heart":
     * 
     * <span class="fancytree-custom-icon ui-icon ui-icon-heart" />.
     */
    @Input()
    public icon?: boolean|string;

    /**
     * Unique key for this node (auto-generated if omitted).
     */
    @Input()
    public key?: string;

    /**
     * Lazy folders call the lazyLoad on first expand to load their children.
     */
    @Input()
    public lazy?: boolean;

    /**
     * Reserved, used by 'clones' extension.
     */
    @Input()
    public refKey?: string;

    /**
     * Initial selection state. Use node.setSelected() or node.isSelected() to access.
     */
    @Input()
    public selected?: boolean;

    /**
     * If set, make this node a status node. Values: 'error', 'loading', 'nodata', 'paging'.
     */
    @Input()
    public statusNodeType?: string;

    /**
     * Will be added as title attribute, thus enabling a tooltip.
     *
     * See also the global tree.tooltip option.
     */
    @Input()
    public tooltip?: string;

    /**
     * Prevent (de-)selection using mouse or keyboard.
     * 
     * Note: This node can still be (de)selected by status propagation in selectMode 3.
     * (Set unselectableStatus to prevent this.)
     */
    @Input()
    public unselectable?: boolean;

    /**
     * Ignore this node when calculating the partsel
     * status of parent nodes in selectMode 3 propagation.
     * 
     * If defined, unselectable: true is implied.
     */
    @Input()
    public unselectableIgnore?: boolean;

    /**
     * Use this as constant selected value
     * (overriding selectMode 3 propagation).
     * 
     * If defined, unselectable: true is implied.
     */
    @Input()
    public unselectableStatus?: boolean;

    //######################### public methods - implementation of AfterContentInit #########################
    
    /**
     * Called when content was initialized
     */
    public ngAfterContentInit()
    {
        if(isBlank(this.children))
        {
            this._childrenQuerySubscription = this.childrenQuery
                .changes
                .subscribe((changes: QueryList<FancyTreeNodeComponent>) => this.children = changes.toArray().filter(itm => itm != this));

            this.children = this.childrenQuery.toArray().filter(itm => itm != this);
        }
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._childrenQuerySubscription)
        {
            this._childrenQuerySubscription.unsubscribe();
            this._childrenQuerySubscription = null;
        }
    }
}