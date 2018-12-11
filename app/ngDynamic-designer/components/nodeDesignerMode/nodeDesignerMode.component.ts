import {Component, ChangeDetectionStrategy, ViewChild, OnDestroy, AfterViewInit, ElementRef, Input} from "@angular/core";
import {Subscription} from "rxjs";

import {NodeDesignerComponent} from "../nodeDesigner/nodeDesigner.component";
import {NodeComponentPaletteComponent, COMPONENT_DRAG, NODE_DRAG} from "../nodeComponentPalette/nodeComponentPalette.component";
import {DynamicComponentRelationMetadata, DynamicComponentRelationOutputMetadata} from "../../../ngDynamic-core";
import {NodeDesignerNodeState} from "../nodeDesigner/nodeDesigner.interface";
import {DesignerLayoutPlaceholderComponent, RelationsMetadata, SvgNodeDynamicNode} from "../../interfaces";
import {PackageLoader} from "../../packageLoader";

/**
 * Component used for displaying node designer mode
 */
@Component(
{
    selector: 'node-designer-mode',
    templateUrl: 'nodeDesignerMode.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['nodeDesignerMode.component.scss']
})
export class NodeDesignerModeComponent implements OnDestroy, AfterViewInit
{
    //######################### private fields #########################

    /**
     * Subscription for node component destruction
     */
    private _nodeComponentDestryingSubscription: Subscription;

    /**
     * Mutation observer for observing changing of visibility
     */
    private _observer: MutationObserver;

    //######################### public properties - template bindings #########################

    /**
     * Indication whether is drop zone visible
     */
    public dropZoneVisible: boolean = false;

    //######################### public properties - inputs #########################

    /**
     * Relations metadata from server
     */
    @Input()
    public relationsMetadata: DynamicComponentRelationMetadata[] = [];

    /**
     * Node designer metadata storing state of nodes
     */
    @Input()
    public metadata?: NodeDesignerNodeState[] = [];

    //######################### public properties - children #########################

    /**
     * Node designer instance
     */
    @ViewChild(NodeDesignerComponent)
    public nodeDesigner: NodeDesignerComponent;

    /**
     * Node component palette instance
     */
    @ViewChild(NodeComponentPaletteComponent)
    public nodeComponentPallete: NodeComponentPaletteComponent;

    //######################### constructor #########################
    constructor(private _element: ElementRef<HTMLElement>,
                private _packageLoader: PackageLoader)
    {
    }

    //######################### public methods - implementation of AfterViewInit #########################
    
    /**
     * Called when view was initialized
     */
    public ngAfterViewInit()
    {
        this._nodeComponentDestryingSubscription = this.nodeDesigner.destroyingComponentNode.subscribe(component =>
        {
            let found = this.nodeComponentPallete.usedComponents.find(itm => itm.component == component);
            let index = this.nodeComponentPallete.usedComponents.indexOf(found);
            this.nodeComponentPallete.usedComponents.splice(index, 1);
            this.nodeComponentPallete.availableComponents.push(found);
            this.nodeComponentPallete.invalidateVisuals();
        });

        this._observer = new MutationObserver(async (mutations) =>
        {
            if(mutations.length)
            {
                //displaying
                if(mutations[0].oldValue.indexOf('display: none;') >= 0)
                {
                    this.nodeComponentPallete.updateComponents();

                    if(this.metadata && this.metadata.length &&
                       this.relationsMetadata && this.relationsMetadata.length)
                    {
                        await this._loadNodeDesignerState();

                        this.metadata = [];
                        this.relationsMetadata = [];
                    }
                }
            }
        });

        this._observer.observe(this._element.nativeElement,
        {
            subtree: false,
            childList: false,
            attributes: true,
            attributeOldValue: true,
            characterData: false,
            characterDataOldValue: false,
            attributeFilter: ['style']
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._nodeComponentDestryingSubscription)
        {
            this._nodeComponentDestryingSubscription.unsubscribe();
            this._nodeComponentDestryingSubscription = null;
        }

        if(this._observer)
        {
            this._observer.disconnect();
            this._observer = null;
        }
    }

    //######################### public methods - template bidings #########################

    /**
     * Handles drop event for adding new node into designer
     * @param event Event with drag n drop data
     */
    public drop(event: DragEvent)
    {
        event.preventDefault();

        let type = event.dataTransfer.getData('text/plain');

        //handle component drag
        if(type == COMPONENT_DRAG)
        {
            let component = this.nodeComponentPallete.availableComponents.find(itm => itm.component.id == event.dataTransfer.getData('text/id'));

            this.nodeDesigner.addComponent({
                                               x: event.layerX,
                                               y: event.layerY
                                           },
                                           component.component,
                                           component.metadata);

            this._setComponentAsUsed(component);
        }

        //handle node drag
        if(type == NODE_DRAG)
        {
            let node = this.nodeComponentPallete.nodesDefinitions.find(itm => itm.name == event.dataTransfer.getData('text/name'));

            this.nodeDesigner.addNode({
                                          x: event.layerX,
                                          y: event.layerY
                                      },
                                      node);
        }
    }

    //######################### private methods #########################

    /**
     * Loads node designer state from permament store
     */
    private async _loadNodeDesignerState()
    {
        let relations:
        {
            svgNode: SvgNodeDynamicNode;
            outputs: DynamicComponentRelationOutputMetadata[];
            id: string;
            dynamic: boolean;
        }[] = [];

        this.metadata.forEach(meta =>
        {
            if(meta.componentNode)
            {
                console.log(this._packageLoader);

                // let component = this.nodeComponentPallete.availableComponents.find(itm => itm.component.ɵId == meta.id);

                // console.log(component);

                // this.nodeDesigner.addComponent(meta.position, )
            }
            else
            {
                let relationsMetadata = this.relationsMetadata.find(itm => itm.id == meta.id);
                let designerRelationsMetadata = this.nodeComponentPallete.nodesDefinitions.find(itm => itm.nodeType == relationsMetadata.nodeType);
                
                relations.push(
                {
                    //TODO - added dynamic input indication
                    svgNode: this.nodeDesigner.addNode(meta.position, designerRelationsMetadata, relationsMetadata.nodeOptions),
                    outputs: relationsMetadata.outputs,
                    id: meta.id,
                    dynamic: false
                });
            }
        });

        relations.forEach(relation =>
        {
            if(relation.outputs && relation.outputs.length)
            {
                relation.outputs.forEach(output =>
                {
                    if(output.inputs && output.inputs.length)
                    {
                        output.inputs.forEach(input =>
                        {
                            let svgRelation = relation.svgNode.addOutputRelation(output.outputName);
                            let inputPeer = relations.find(itm => itm.id == input.id);

                            inputPeer.svgNode.addInputRelation(svgRelation, input.inputName, relation.dynamic);
                            relation.svgNode.updateRelations();
                            inputPeer.svgNode.updateRelations();
                        });
                    }
                });
            }
        });
    }

    /**
     * Sets component as used
     * @param component Component to be set as used
     */
    private _setComponentAsUsed(component: {component: DesignerLayoutPlaceholderComponent; metadata: RelationsMetadata})
    {
        let index = this.nodeComponentPallete.availableComponents.indexOf(component);
        this.nodeComponentPallete.availableComponents.splice(index, 1);
        this.nodeComponentPallete.usedComponents.push(component);
    }
}