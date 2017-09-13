import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import {FancyTreeNodeData} from './fancyTree.interface';

/**
 * Component used for rendering fancytree node
 */
@Component(
{
    selector: 'li[fancytree-node-renderer]',
    templateUrl: 'fancyTreeNodeRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: 
    {
        '[attr.data-json]': 'dataJson'
    }
})
export class FancyTreeNodeRendererComponent
{
    //######################### public properties - host #########################

    /**
     * Gets serialized data for node
     */
    public get dataJson(): string
    {
        if(!this.node)
        {
            return null;
        }

        return JSON.stringify(
        {
            active: this.node.active,
            checkbox: this.node.checkbox,
            data: this.node.data,
            expanded: this.node.expanded,
            extraClasses: this.node.extraClasses,
            focus: this.node.focus,
            folder: this.node.folder,
            icon: this.node.icon,
            key: this.node.key,
            lazy: this.node.lazy,
            refKey: this.node.refKey,
            selected: this.node.selected,
            statusNodeType: this.node.statusNodeType,
            tooltip: this.node.tooltip,
            unselectable: this.node.unselectable,
            unselectableIgnore: this.node.unselectableIgnore,
            unselectableStatus: this.node.unselectableStatus
        });
    }

    //######################### public properties - inputs #########################

    /**
     * Node to be rendered
     */
    @Input('fancytree-node-renderer')
    public node: FancyTreeNodeData;
}