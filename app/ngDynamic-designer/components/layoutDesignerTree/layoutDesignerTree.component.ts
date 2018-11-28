import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from "@angular/core";
import {FlatTreeControl} from "@angular/cdk/tree";
import {Subscription} from "rxjs";

import {TreeFlattener, TreeFlatDataSource} from "./dataSource/flatDataSource";
import {ComponentsService, PropertiesService} from "../../services";

//TODO doplnit interface pre tree

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
        return false;
        //return !!node.children && node.children.length > 0;
    }

    private _getChildren(node: any): any[]
    {
        return [];
        //return node.children;
    }

    private _handleComponents()
    {
        //TODO potrebne vyriesit ziskavanie children, zadefinovat interface
        this.treeDataSource.data = [
            {
                options: this._componentSvc.components[0].options
            }
        ];
        
        this._changeDetector.detectChanges();
    }
}