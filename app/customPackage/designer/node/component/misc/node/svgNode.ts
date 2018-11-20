import {Selection, BaseType, drag, event, select} from 'd3';

/**
 * Class that represents SVG node and interaction with it
 */
export class SvgNode
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
     * X coordinate of node
     */
    private _nodeX: number = 0;

    /**
     * Y coordinate of node
     */
    private _nodeY: number = 0;

    //######################### constructor #########################
    constructor(private _parentGroup: Selection<BaseType, {}, null, undefined>)
    {
        this._initialize();
    }

    //######################### public methods #########################

    /**
     * Method used for destroying this component
     */
    public destroy()
    {
        this._miscGroup.remove();
        this._miscGroup = null;
        this._nodeGroup.remove();
        this._nodeGroup = null;
    }

    //######################### private methods #########################

    /**
     * Initialize node
     */
    private _initialize()
    {
        this._nodeGroup = this._parentGroup.append('g');
        this._miscGroup = this._nodeGroup.append('g');

        this._nodeGroup.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 100)
            .attr('height', 150)
            .attr('fill', 'transparent')
            .attr('stroke', '#d4d4d4');

        this._inputsGroup = this._nodeGroup.append('g');

        this._renderVisuals();
        this._addInputs();

        this._nodeGroup.call(drag().on('drag', () =>
        {
            this._nodeX += event.dx;
            this._nodeY += event.dy;

            this._nodeGroup.attr('transform', `translate(${this._nodeX}, ${this._nodeY})`);
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
            .attr('width', 100)
            .attr('height', 20)
            .attr('fill', '#569cd6');

        this._miscGroup.append("text")
            .text("Sample node")
                .attr("x", 4)
                .attr("y", 14)
                .attr('fill', '#F8F8F8');
    }

    /**
     * Adds inputs to this node
     */
    private _addInputs()
    {
        let data =
        [
            40, 65
        ];

        this._inputsGroup.selectAll('circle')
            .data(data)
            .enter()
            .call((x) =>
            {
                x.append('circle')
                    .attr('cx', 0)
                    .attr('r', 5)
                    .attr('fill', '#569cd6')
                    .attr('cy', d => d);

                x.append('circle')
                        .attr('cx', 0)
                        .attr('r', 8)
                        .attr('fill', 'transparent')
                        .attr('opacity', 0.5)
                        .attr('cy', d => d)
                    .on('mouseenter', (datum, index, groups) =>
                    {
                        select(groups[index])
                            .attr('fill', '#569cd6');
                    })
                    .on('mouseleave', (datum, index, groups) =>
                    {
                        select(groups[index])
                            .attr('fill', 'transparent');
                    });
            });

    }
}