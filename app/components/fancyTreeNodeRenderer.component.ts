import {Component, ChangeDetectionStrategy, Input, HostBinding} from '@angular/core';

import {FancyTreeNodeData} from './fancyTree.interface';

/**
 * Component used for rendering fancytree node
 */
@Component(
{
    selector: 'li[fancytree-node-renderer]',
    template: 
   `<ng-template #defaultTemplate>
        {{node?.content}}
    </ng-template>

    <ng-container *ngTemplateOutlet="(!node?.contentHtml ? defaultTemplate : node?.contentHtml); context: {$implicit: node}"></ng-container>

    <ul *ngIf="!!node?.children">
        <li *ngFor="let childNode of node?.children" [fancytree-node-renderer]="childNode"></li>
    </ul>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FancyTreeNodeRendererComponent
{
    //######################### public properties - host #########################

    /**
     * Gets serialized data for node
     */
    @HostBinding('attr.data-json')
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