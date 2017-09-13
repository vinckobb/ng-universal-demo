import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import {FancyTreeNodeData} from './fancyTree.interface';

/**
 * Component used for rendering fancytree node
 */
@Component(
{
    selector: 'li[fancytree-node-renderer]',
    templateUrl: 'fancyTreeNodeRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FancyTreeNodeRendererComponent
{
    //######################### public properties - inputs #########################

    /**
     * Node to be rendered
     */
    @Input('fancytree-node-renderer')
    public node: FancyTreeNodeData;
}