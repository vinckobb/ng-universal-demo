import {isPresent} from '@asseco/common';
import {Selection, BaseType, drag, event, select} from 'd3';

import {RelationsMetadata, Coordinates, SvgDynamicNode, InputOutputMetadata} from '../../../../../../ngDynamic-designer';
import {SvgRelation} from '../relation/svgRelation';

/**
 * Offset of first peer in node
 */
const peerOffset: number = 50;

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
 * Information about currenctly active drop peer
 */
export interface SvgPeerDropArea
{
    /**
     * Svg node that has active drop area
     */
    svgNode: SvgNode;

    /**
     * Name of input which has active drop area
     */
    inputId: string;
}

/**
 * Class that represents SVG node and interaction with it
 */
export class SvgNode implements SvgDynamicNode
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
     * Group of output circles
     */
    private _outputsGroup: Selection<BaseType, {}, null, undefined>;

    /**
     * X coordinate of node
     */
    private _nodeX: number;

    /**
     * Y coordinate of node
     */
    private _nodeY: number;

    //######################### constructor #########################
    constructor(private _parentGroup: Selection<BaseType, {}, null, undefined>,
                private _metadata: RelationsMetadata,
                private _validDropToggle: (dropArea: SvgPeerDropArea) => void,
                private _createRelation: () => SvgRelation)
    {
        this._nodeX = isPresent(this._metadata.x) ? this._metadata.x : 0;
        this._nodeY = isPresent(this._metadata.y) ? this._metadata.y : 0;

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
     * @param initial Indication whether is invalidation initial, or on event
     */
    public invalidateVisuals(propertyName?: string, initial?: boolean): void
    {
    }

    /**
     * Gets input coordinates of specified input
     * @param inputName Name of input which coordinates will be get
     */
    public getInputCoordinates(inputName: string): Coordinates
    {
        return {
            x: this._nodeX,
            y: this._nodeY + this._metadata.inputs.find(itm => itm.id == inputName).y
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
    public addOutputRelation(relation: SvgRelation, outputName: string)
    {
        let outputPeer = this._metadata.outputs.find(itm => itm.id == outputName);

        outputPeer.relations = outputPeer.relations || [];
        outputPeer.relations.push(relation);
    }

    /**
     * Adds relation to specified input
     * @param relation Relation to be added to specified input
     * @param inputName Input name which will register relation
     */
    public addInputRelation(relation: SvgRelation, inputName: string)
    {
        let inputPeer = this._metadata.inputs.find(itm => itm.id == inputName);

        inputPeer.relations = inputPeer.relations || [];
        inputPeer.relations.push(relation);
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
            .attr('stroke', '#d4d4d4');

        this._miscGroup = this._nodeGroup.append('g');
        this._inputsGroup = this._nodeGroup.append('g');
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
    }

    /**
     * Adds inputs to this node
     */
    private _addInputs()
    {
        this._metadata.inputs = this._metadata.inputs || [];

        this._metadata.inputs.forEach((input, index) => input.y = peerOffset + (index * peerStep));

        this._inputsGroup.selectAll('circle')
            .data(this._metadata.inputs)
            .enter()
            .call(sel =>
            {
                sel.append('circle')
                    .attr('cx', 0)
                    .attr('r', 5)
                    .attr('fill', '#569cd6')
                    .attr('cy', itm => itm.y);

                sel.append('text')
                    .text(itm => itm.name)
                        .attr('x', 10)
                        .attr('y', itm => itm.y + 4)
                        .attr('fill', '#F8F8F8');

                sel.append('circle')
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
                            inputId: datum.id
                        });
                    })
                    .on('mouseleave', (_datum, index, groups) =>
                    {
                        select(groups[index])
                            .attr('fill', 'transparent');

                        this._validDropToggle(null);
                    });
            });

    }

    /**
     * Adds outputs to this node
     */
    private _addOutputs()
    {
        let relation: SvgRelation;
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
                    .call(drag<SVGCircleElement, InputOutputMetadata>()
                        .on('start', datum =>
                        {
                            datum.relations = datum.relations || [];

                            relation = this._createRelation();
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
                    input.relations[0].end = this.getInputCoordinates(input.id);
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