import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from "@angular/core";
import {FlatTreeControl} from "@angular/cdk/tree";
import {Subscription} from "rxjs";

import {TreeFlattener, TreeFlatDataSource} from "./dataSource/flatDataSource";
import {ComponentsService, PropertiesService} from "../../services";
import {DesignerLayoutPlaceholderComponent} from "../../interfaces";

//TODO doplnit interface pre tree, komentare
/**
 * - Vytvorit vlastny TreeControl na to aby sa nezavrel strom pri kazdej zmene
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

    public treeControl: FlatTreeControl<any>;

    public treeDataSource: TreeFlatDataSource<any, any>;

    //######################### constructor #########################
    constructor(private _componentSvc: ComponentsService,
                private _propertiesSvc: PropertiesService,
                private _changeDetector: ChangeDetectorRef)
    {
        this.treeControl = new FlatTreeControl(this._getLevel, this.isExpandable);
        this._treeFlatener = new TreeFlattener(this._transform, this._getLevel, this.isExpandable, this._getChildren);
        this.treeDataSource = new TreeFlatDataSource(this.treeControl, this._treeFlatener);

        this._componentsChangeSubscription = this._componentSvc.componentsChange.subscribe(() => this._handleComponents());
    }

    public ngOnDestroy()
    {
        if (this._componentsChangeSubscription)
        {
            this._componentsChangeSubscription.unsubscribe();
            this._componentsChangeSubscription = null;
        }
    }

    public showProperties(options: any)
    {
        if (!options)
        {
            return;
        }

        this._propertiesSvc.showProperties(options);
    }

    private _transform(node: any, level: number): any
    {
        node.level = level;
        return node;
    }

    private _getLevel(node: any): number
    {
        return node.level;
    }

    public isExpandable(node: any): boolean
    {
        return !!node.children && node.children.length > 0;
    }

    private _getChildren(node: any): any[]
    {
        return node.children;
    }

    /**
     * Gets children from `DesignerLayoutPlaceholderComponent`
     * @param component
     */
    private _getChildrenForComponent(component: DesignerLayoutPlaceholderComponent): any[]
    {
        if (!component)
        {
            return null;
        }

        return component.children.filter(item => !!item).map(item => {
            return {
                options: item.options,
                children: this._getChildrenForComponent(item)
            };
        });
    }

    /**
     * Transforms `DesignerLayoutPlaceholderComponent` and its children into tree structure
     */
    private _handleComponents()
    {
        //TODO zadefinovat interface
        this.treeDataSource.data = 
        [
            {
                options: this._componentSvc.components[0].options,
                children: this._getChildrenForComponent(this._componentSvc.components[0])
            }
        ];
        
        this._changeDetector.detectChanges();
    }
}