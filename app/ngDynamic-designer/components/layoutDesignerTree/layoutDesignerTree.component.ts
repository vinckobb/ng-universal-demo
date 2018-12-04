import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {TreeFlattener, TreeFlatDataSource} from "./dataSource/flatDataSource";
import {ComponentsService, PropertiesService} from "../../services";
import {DesignerLayoutPlaceholderComponent} from "../../interfaces";
import {AdvancedFlatTreeControl} from "./treeControl/flatTreeControl";
import {LayoutComponentTreeNode} from "./layoutDesignerTree.interface";

/**
 * Component used for displaying layout metadata in tree structure
 */
@Component(
    {
        selector: 'layout-designer-tree',
        templateUrl: 'layoutDesignerTree.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush
    }
)
export class LayoutDesignerTreeComponent implements OnDestroy
{
    //######################### private properties #########################

    /**
     * Subscription for changes of registered components
     */
    private _componentsChangeSubscription: Subscription;

    /**
     * Tree flattening implementation class
     */
    private _treeFlatener: TreeFlattener<any, any>;

    //######################### public properties - template bindings #########################

    /**
     * Tree control
     */
    public treeControl: AdvancedFlatTreeControl<LayoutComponentTreeNode>;

    /**
     * Tree data source
     */
    public treeDataSource: TreeFlatDataSource<any, any>;

    //######################### constructor #########################
    constructor(private _componentSvc: ComponentsService,
                private _propertiesSvc: PropertiesService,
                private _changeDetector: ChangeDetectorRef)
    {
        this.treeControl = new AdvancedFlatTreeControl(this._getLevel, this.isExpandable, this._getNodeId);
        this._treeFlatener = new TreeFlattener(this._transform, this._getLevel, this.isExpandable, this._getChildren);
        this.treeDataSource = new TreeFlatDataSource(this.treeControl, this._treeFlatener);

        this._componentsChangeSubscription = this._componentSvc.componentsChange.subscribe(() => this._handleComponents());
    }

    //######################### public methods - implementation of OnDestroy #########################

    public ngOnDestroy()
    {
        if (this._componentsChangeSubscription)
        {
            this._componentsChangeSubscription.unsubscribe();
            this._componentsChangeSubscription = null;
        }
    }

    //######################### public methods #########################

    /**
     * Sets options for properties component
     * @param options 
     */
    public showProperties(options: any)
    {
        if (!options)
        {
            return;
        }

        this._propertiesSvc.showProperties(options);
    }

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals()
    {
        this._changeDetector.detectChanges();
    }

    /**
     * Checks if specified node is expandable
     * @param node tree node
     */
    public isExpandable(node: LayoutComponentTreeNode): boolean
    {
        return !!node.children && node.children.length > 0;
    }

    //######################### private methods #########################

    /**
     * Flatten tree node
     * @param node tree node
     * @param level node depth level
     */
    private _transform(node: LayoutComponentTreeNode, level: number): LayoutComponentTreeNode
    {
        node.level = level;
        return node;
    }

    /**
     * Gets tree node depth level
     * @param node 
     */
    private _getLevel(node: LayoutComponentTreeNode): number
    {
        return node.level;
    }

    /**
     * Gets tree node identifier
     * @param node 
     */
    private _getNodeId(node: LayoutComponentTreeNode): string|number
    {
        return node.id;
    }

    /**
     * Gets tree node children
     * @param node 
     */
    private _getChildren(node: LayoutComponentTreeNode): LayoutComponentTreeNode[]
    {
        return node.children;
    }

    /**
     * Transforms component to tree node
     * @param component 
     */
    private _getNodeForComponent(component: DesignerLayoutPlaceholderComponent)
    {
        if (!component)
        {
            return null;
        }

        return {
            id: component.id, //TODO upravit ziskavanie id z komponentu. Toto id vieme aktualne menit
            options: component.options,
            children: this._getChildrenForComponent(component)
        }
    }

    /**
     * Transforms `DesignerLayoutPlaceholderComponent` and its children into tree structure
     */
    private _handleComponents()
    {
        if (!this._componentSvc.components ||
            this._componentSvc.components.length == 0)
        {
            this.treeDataSource.data = [];

            this.invalidateVisuals();
            return;
        }

        let component = this._componentSvc.components[0]

        this.treeDataSource.data = [this._getNodeForComponent(component)];
        
        this.invalidateVisuals();
    }

    /**
     * Gets children for specified `DesignerLayoutPlaceholderComponent`
     * @param component 
     */
    private _getChildrenForComponent(component: DesignerLayoutPlaceholderComponent): LayoutComponentTreeNode[]
    {
        if (!component || !component.children)
        {
            return null;
        }

        return component.children.filter(item => !!item).map(item => {
            return this._getNodeForComponent(item);
        });
    }
}