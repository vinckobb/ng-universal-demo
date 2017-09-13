import {TemplateRef} from "@angular/core";

/**
 * Fancytree node
 */
export interface FancyTreeNodeData
{
    /**
     * Initialization only, but will not be stored with the node.
     */
    active?: boolean;

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
    checkbox?: boolean|string;

    /**
     * Array of nested fancy tree nodes
     */
    children?: FancyTreeNodeData[];

    /**
     * Node text (may contain HTML tags). Use node.setTitle() to modify.
     */
    content?: string;
    
    /**
     * Template that is rendered instead of title if specified
     */
    contentHtml?: TemplateRef<Object>;

    /**
     * Represents dynamic data for tree node
     */
    data?: Object;

    /**
     * Initial expansion state. Use node.setExpanded() or node.isExpanded() to access.
     */
    expanded?: boolean;

    /**
     * Class names added to the node markup (separate with space).
     *
     * Note: use node.add/remove/toggleClass() to modify.
     */
    extraClasses?: string;

    /**
     * Initialization only, but will not be stored with the node.
     */
    focus?: boolean;

    /**
     * Folders have different default icons and honor the clickFolderMode option.
     */
    folder?: boolean;

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
    icon?: boolean|string;

    /**
     * Unique key for this node (auto-generated if omitted).
     */
    key?: string;

    /**
     * Lazy folders call the lazyLoad on first expand to load their children.
     */
    lazy?: boolean;

    /**
     * Reserved, used by 'clones' extension.
     */
    refKey?: string;

    /**
     * Initial selection state. Use node.setSelected() or node.isSelected() to access.
     */
    selected?: boolean;

    /**
     * If set, make this node a status node. Values: 'error', 'loading', 'nodata', 'paging'.
     */
    statusNodeType?: string;

    /**
     * Will be added as title attribute, thus enabling a tooltip.
     *
     * See also the global tree.tooltip option.
     */
    tooltip?: string;

    /**
     * Prevent (de-)selection using mouse or keyboard.
     * 
     * Note: This node can still be (de)selected by status propagation in selectMode 3.
     * (Set unselectableStatus to prevent this.)
     */
    unselectable?: boolean;

    /**
     * Ignore this node when calculating the partsel
     * status of parent nodes in selectMode 3 propagation.
     * 
     * If defined, unselectable: true is implied.
     */
    unselectableIgnore?: boolean;

    /**
     * Use this as constant selected value
     * (overriding selectMode 3 propagation).
     * 
     * If defined, unselectable: true is implied.
     */
    unselectableStatus?: boolean;
}