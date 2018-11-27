import {Component, ChangeDetectionStrategy, Input, AfterViewInit, ChangeDetectorRef} from "@angular/core";
import {FlatTreeControl} from "@angular/cdk/tree";

import {TreeFlattener, TreeFlatDataSource} from "./dataSource/flatDataSource";

//TODO doplnit interface pre tree

@Component(
    {
        selector: 'layout-designer-tree',
        templateUrl: 'layoutDesignerTree.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush
    }
)
export class LayoutDesignerTreeComponent implements AfterViewInit
{
    private _treeFlatener: TreeFlattener<any, any>;

    //######################### public properties - template bindings #########################

    public treeControl: FlatTreeControl<any>;

    public treeDataSource: TreeFlatDataSource<any, any>;

    //######################### public properties - inputs #########################

    @Input()
    public data: any[] = [
        {
            name: "test1",
            children: 
            [
                {
                    'name': 'test1-1'
                }
            ]
        },
        {
            name: "test2",
            children: 
            [
                {
                    'name': 'test2-1',
                    children: 
                    [
                        {
                            'name': 'test2-1-1'
                        },
                        {
                            'name': 'test2-1-2'
                        }
                    ]
                },
                {
                    'name': 'test2-2'
                }
            ]
        },
        {
            name: "test3",
            children: 
            [
                {
                    'name': 'test3-1'
                }
            ]
        }
    ];

    //######################### constructor #########################
    constructor(private _changeDetector: ChangeDetectorRef)
    {
        this.treeControl = new FlatTreeControl(this._getLevel, this._isExpandable);
        this._treeFlatener = new TreeFlattener(this._transform, this._getLevel, this._isExpandable, this._getChildren);
        this.treeDataSource = new TreeFlatDataSource(this.treeControl, this._treeFlatener);
    }

    public ngAfterViewInit()
    {
        this.treeDataSource.data = this.data;

        this._changeDetector.detectChanges();
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

    private _isExpandable(node: any): boolean
    {
        return !!node.children;
    }

    private _getChildren(node: any): any[]
    {
        return node.children;
    }
}