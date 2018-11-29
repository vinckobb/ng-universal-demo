import {isPresent} from '@asseco/common';
import {Selection, BaseType, drag, event, select} from 'd3';

import {RelationsMetadata, Coordinates, RelationsInputOutputMetadata, SvgRelationDynamicNode, SvgNodeDynamicNode, SvgPeerDropArea, PropertiesMetadata} from '../../../../interfaces';
import {PropertiesService} from '../../../../services';

/**
 * Offset of first peer in node
 */
const peerOffset: number = 55;

/**
 * Minimal height of node
 */
const minHeight: number = 150;

/**
 * Size of step for next peers
 */
const peerStep: number = 25;

/**
 * Static width of node
 */
export const nodeWidth: number = 180;

/**
 * Class that represents SVG node and interaction with it
 */
export class SvgNode implements SvgNodeDynamicNode
{
    //######################### private fields #########################

    /**
     * Node group that represents this node
     */
    private _nodeGroup: Selection<BaseType, {}, null, undefined>;

    /**
     * Group for misc stuff rendered for
     */
    private _miscGroup: Selection<BaseType, {}, null, undefined>;

    /**
     * Group of inputs circles
     */
    private _inputsGroup: Selection<BaseType, {}, null, undefined>;

    /**
     * Group of dynamic inputs circles
     */
    private _dynamicInputsGroup: Selection<BaseType, {}, null, undefined>;

    /**
     * Group of output circles
     */
    private _outputsGroup: Selection<BaseType, {}, null, undefined>;

    /**
     * Properties metadata, used for changes node options
     */
    private _properties: PropertiesMetadata;

    /**
     * X coordinate of node
     */
    private _nodeX: number;

    /**
     * Y coordinate of node
     */
    private _nodeY: number;

    /**
     * Array of dynamic inputs
     */
    private _dynamicInputs: RelationsInputOutputMetadata[] = [];

    //######################### public properties #########################

    /**
     * Unique id of component which outputs will be connected
     */
    public get id(): string
    {
        return null;
    }

    /**
     * Name of node type, that should be constructed instead of component
     */
    public get nodeType(): string
    {
        return this._metadata.nodeType;
    }

    /**
     * Options for node type
     */
    public get nodeOptions(): any
    {
        return null;
    }

    //######################### constructor #########################
    constructor(private _parentGroup: Selection<BaseType, {}, null, undefined>,
                private _metadata: RelationsMetadata,
                private _validDropToggle: (dropArea: SvgPeerDropArea) => void,
                private _createRelation: () => SvgRelationDynamicNode,
                private _propertiesSvc: PropertiesService)
    {
        this._nodeX = isPresent(this._metadata.x) ? this._metadata.x : 0;
        this._nodeY = isPresent(this._metadata.y) ? this._metadata.y : 0;

        this._properties =
        {
            id: this._metadata.id,
            name: this._metadata.name,
            description: this._metadata.description,
            dynamicNodeInstance: this,
            properties: this._metadata.nodeOptions
        };

        this._initialize();
    }

    //######################### public methods #########################

    /**
     * Method used for destroying this relation node
     */
    public destroy()
    {
        this._miscGroup.remove();
        this._miscGroup = null;
        this._nodeGroup.remove();
        this._nodeGroup = null;
    }

    /**
     * Explicitly runs invalidation of content (change detection)
     * @param propertyName Name of property that has changed
     */
    public invalidateVisuals(propertyName?: string): void
    {
        if(propertyName == "properties")
        {
            this._dynamicInputs = this._metadata.dynamicInputs(this._properties.value);

            this._addDynamicInputs();
        }
    }

    /**
     * Gets input coordinates of specified input
     * @param inputName Name of input which coordinates will be get
     * @param dynamic Indication whether is input dynamic
     */
    public getInputCoordinates(inputName: string, dynamic: boolean): Coordinates
    {
        return {
            x: this._nodeX,
            y: this._nodeY + (dynamic ? this._dynamicInputs : this._metadata.inputs).find(itm => itm.id == inputName).y
        };
    }

    /**
     * Gets output coordinates of specified output
     * @param outputName Name of output which coordinates will be get
     */
    public getOutputCoordinates(outputName: string): Coordinates
    {
        return {
            x: this._nodeX + nodeWidth,
            y: this._nodeY + this._metadata.outputs.find(itm => itm.id == outputName).y
        };
    }

    /**
     * Adds relation to specified output
     * @param relation Relation to be added to specified output
     * @param outputName Output name which will register relation
     */
    public addOutputRelation(relation: SvgRelationDynamicNode, outputName: string)
    {
        let outputPeer = this._metadata.outputs.find(itm => itm.id == outputName);

        outputPeer.relations = outputPeer.relations || [];

        relation.startDestroyingSubscription = relation.destroying.subscribe(relation =>
        {
            let index = outputPeer.relations.indexOf(relation);

            if(index >= 0)
            {
                outputPeer.relations.splice(index, 1);
            }
        });

        outputPeer.relations.push(relation);
    }

    /**
     * Adds relation to specified input
     * @param relation Relation to be added to specified input
     * @param inputName Input name which will register relation
     * @param dynamic Indication whether is input dynamic
     */
    public addInputRelation(relation: SvgRelationDynamicNode, inputName: string, dynamic: boolean): boolean
    {
        let inputPeer = (dynamic ? this._dynamicInputs : this._metadata.inputs).find(itm => itm.id == inputName);

        inputPeer.relations = inputPeer.relations || [];

        //trying to add same relation
        if(inputPeer.relations.length > 0 && relation.start.x == inputPeer.relations[0].start.x && relation.start.y == inputPeer.relations[0].start.y)
        {
            return false;
        }

        //trying to replace existing relation to this input
        if(inputPeer.relations.length > 0)
        {
            inputPeer.relations[0].destroy();
        }

        relation.endDestroyingSubscription = relation.destroying.subscribe(relation =>
        {
            let index = inputPeer.relations.indexOf(relation);

            if(index >= 0)
            {
                inputPeer.relations.splice(index, 1);
            }
        });

        inputPeer.relations.push(relation);

        return true;
    }

    //######################### private methods #########################

    /**
     * Initialize node
     */
    private _initialize()
    {
        this._nodeGroup = this._parentGroup.append('g')
            .attr('transform', `translate(${this._nodeX}, ${this._nodeY})`);

        this._nodeGroup.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', nodeWidth)
                .attr('height', this._getHeight())
                .attr('fill', '#1e1e1e')
                .attr('stroke', '#d4d4d4')
            .on('click', () =>
            {
                this._propertiesSvc.showProperties(this._properties)
            });

        this._miscGroup = this._nodeGroup.append('g');
        this._inputsGroup = this._nodeGroup.append('g');
        this._dynamicInputsGroup = this._nodeGroup.append('g');
        this._outputsGroup = this._nodeGroup.append('g');

        this._renderVisuals();
        this._addInputs();
        this._addOutputs();

        this._nodeGroup.call(drag().on('drag', () =>
        {
            this._nodeX += event.dx;
            this._nodeY += event.dy;

            this._nodeGroup.attr('transform', `translate(${this._nodeX}, ${this._nodeY})`);
            this._updateRelations();
        }));
    }

    /**
     * Renders misc visuals
     */
    private _renderVisuals()
    {
        this._miscGroup.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', nodeWidth)
            .attr('height', 20)
            .attr('fill', '#569cd6');

        this._miscGroup.append("text")
            .text(this._metadata.name)
                .attr("x", 4)
                .attr("y", 14)
                .attr('fill', '#F8F8F8');

        this._miscGroup.append("text")
            .text(`ID: ${this._metadata.id}`)
                .attr("x", 8)
                .attr("y", 36)
                .attr('fill', '#F8F8F8');
    }

    /**
     * Adds inputs to this node
     */
    private _addInputs()
    {
        this._metadata.inputs = this._metadata.inputs || [];
        this._metadata.inputs.forEach((input, index) => input.y = peerOffset + (index * peerStep));

        this._addInputCircles(this._inputsGroup, this._metadata.inputs, false);
    }

    /**
     * Adds dynamic inputs to node
     */
    private _addDynamicInputs()
    {
        this._dynamicInputs.forEach((input, index) => input.y = (this._metadata.inputs.length ? (this._metadata.inputs[this._metadata.inputs.length - 1].y + peerStep) : peerOffset) + (index * peerStep));

        this._addInputCircles(this._dynamicInputsGroup, this._dynamicInputs, true);
    }

    /**
     * Adds inputs into their groups and renders them
     * @param group Inputs group to be extended
     * @param inputs Array of inputs to be added
     * @param dynamic Indication whether is input dynamic or not
     */
    private _addInputCircles(group: Selection<BaseType, {}, null, undefined>, inputs: RelationsInputOutputMetadata[], dynamic: boolean)
    {
        let relation: SvgRelationDynamicNode;

        let changes = group.selectAll('g')
            .data(inputs)
            .call(sel =>
            {
                sel.select('text')
                    .text(itm => itm.name);

                sel.select('circle.action')
                    .datum(d => d);
            });

        changes.exit().remove();

        changes
            .enter()
            .call(sel =>
            {
                let inputGroup = sel.append('g');

                inputGroup.append('circle')
                    .attr('cx', 0)
                    .attr('r', 5)
                    .attr('fill', '#569cd6')
                    .attr('cy', itm => itm.y);

                inputGroup.append('text')
                    .text(itm => itm.name)
                        .attr('x', 10)
                        .attr('y', itm => itm.y + 4)
                        .attr('fill', '#F8F8F8');

                inputGroup.append('circle')
                        .attr('class', 'action')
                        .attr('cx', 0)
                        .attr('r', 10)
                        .attr('fill', 'transparent')
                        .attr('cy', itm => itm.y)
                    .on('mouseenter', (datum, index, groups) =>
                    {
                        select(groups[index])
                            .attr('fill', 'url(#input-hover)');

                        this._validDropToggle(
                        {
                            svgNode: this,
                            inputId: datum.id,
                            dynamic: dynamic
                        });
                    })
                    .on('mouseleave', (_datum, index, groups) =>
                    {
                        select(groups[index])
                            .attr('fill', 'transparent');

                        this._validDropToggle(null);
                    })
                    .call(drag<SVGCircleElement, RelationsInputOutputMetadata>()
                        .on('start', datum =>
                        {
                            relation = datum.relations && datum.relations.length && datum.relations[0];

                            if(!relation)
                            {
                                return;
                            }

                            datum.relations.splice(0, 1);
                        })
                        .on('drag', () =>
                        {
                            if(!relation)
                            {
                                return;
                            }

                            relation.end =
                            {
                                x: event.x + this._nodeX,
                                y: event.y + this._nodeY
                            };

                            relation.invalidateVisuals();
                        })
                        .on('end', () =>
                        {
                            if(!relation)
                            {
                                return;
                            }

                            relation.invalidateVisuals('drop');
                        }));
            });
    }

    /**
     * Adds outputs to this node
     */
    private _addOutputs()
    {
        let relation: SvgRelationDynamicNode;
        this._metadata.outputs = this._metadata.outputs || [];

        this._metadata.outputs.forEach((output, index) => output.y = peerOffset + (index * peerStep));

        this._outputsGroup.selectAll('circle')
            .data(this._metadata.outputs)
            .enter()
            .call(sel =>
            {
                sel.append('circle')
                    .attr('cx', nodeWidth)
                    .attr('r', 5)
                    .attr('fill', '#e99d2c')
                    .attr('cy', itm => itm.y);

                sel.append('text')
                    .text(itm => itm.name)
                        .attr('x', nodeWidth - 10)
                        .attr('y', itm => itm.y + 4)
                        .attr('text-anchor', 'end')
                        .attr('fill', '#F8F8F8');

                sel.append('circle')
                        .attr('cx', nodeWidth)
                        .attr('r', 10)
                        .attr('fill', 'transparent')
                        .attr('cy', itm => itm.y)
                    .on('mouseenter', (_datum, index, groups) =>
                    {
                        select(groups[index])
                            .attr('fill', 'url(#output-hover)');
                    })
                    .on('mouseleave', (_datum, index, groups) =>
                    {
                        select(groups[index])
                            .attr('fill', 'transparent');
                    })
                    .call(drag<SVGCircleElement, RelationsInputOutputMetadata>()
                        .on('start', datum =>
                        {
                            datum.relations = datum.relations || [];

                            relation = this._createRelation();

                            relation.startDestroyingSubscription = relation.destroying.subscribe(relation =>
                            {
                                let index = datum.relations.indexOf(relation);

                                if(index >= 0)
                                {
                                    datum.relations.splice(index, 1);
                                }
                            });

                            relation.start = this.getOutputCoordinates(datum.id);

                            datum.relations.push(relation);
                        })
                        .on('drag', () =>
                        {
                            relation.end =
                            {
                                x: event.x + this._nodeX,
                                y: event.y + this._nodeY
                            };

                            relation.invalidateVisuals();
                        })
                        .on('end', () =>
                        {
                            relation.invalidateVisuals('drop');
                            relation = null;
                        }));
            });

    }

    /**
     * Updates all relations position when dragging
     */
    private _updateRelations()
    {
        if(this._metadata.inputs)
        {
            this._metadata.inputs.forEach(input =>
            {
                if(input.relations && input.relations.length)
                {
                    input.relations[0].end = this.getInputCoordinates(input.id, false);
                    input.relations[0].invalidateVisuals();
                }
            });
        }

        if(this._metadata.outputs)
        {
            this._metadata.outputs.forEach(output =>
            {
                if(output.relations)
                {
                    output.relations.forEach(relation =>
                    {
                        relation.start = this.getOutputCoordinates(output.id);
                        relation.invalidateVisuals();
                    });
                }
            });
        }

        if(this._dynamicInputs)
        {
            this._dynamicInputs.forEach(input =>
            {
                if(input.relations && input.relations.length)
                {
                    input.relations[0].end = this.getInputCoordinates(input.id, true);
                    input.relations[0].invalidateVisuals();
                }
            });
        }
    }

    /**
     * Gets current height
     */
    private _getHeight(): number
    {
        let height = peerOffset + 30;

        if(this._metadata.inputs && this._metadata.inputs.length)
        {
            height += (this._metadata.inputs.length * peerStep);
        }

        return Math.max(minHeight, height);
    }
}