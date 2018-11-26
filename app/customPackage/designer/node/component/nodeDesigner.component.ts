import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, OnInit} from "@angular/core";
import {select, Selection, drag, line, curveBundle, event, zoom} from 'd3';

import {DynamicComponentGeneric} from "../../../../ngDynamic-core";
import {SvgNode} from "./misc";

/**
 * Component used for designing relation nodes
 */
@Component(
{
    selector: 'node-designer-component',
    template: '',
    styles:
    [
        `:host
        {
            display: block;
            height: 100%;
            overflow: hidden;
        }`
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeDesignerComponent implements DynamicComponentGeneric<any>, OnInit
{
    //######################### private fields #########################

    /**
     * All top svg objects
     */
    private _svgData:
    {
        parentGroup?: Selection<SVGGElement, {}, null, undefined>
    } = {};

    //######################### public properties #########################

    /**
     * Options used for rendering this component
     */
    public options: any;

    //######################### constructor #########################
    constructor(private _changeDetector: ChangeDetectorRef,
                private _element: ElementRef<HTMLElement>)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit()
    {
        //creates scale and drag behavior
        let $zoom = zoom()
            .scaleExtent([1/4, 2])
            .on("zoom", () =>
        {
            if(this._svgData.parentGroup)
            {
                this._svgData.parentGroup.attr("transform", event.transform);
            }
        });

        //creates svg element
        let selfObj = select(this._element.nativeElement),
            svgWidth = '100%',
            svgHeight = '100%',
            svg = selfObj.append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .attr("style", "background-color: #1e1e1e;")
            .call($zoom);

        //creates groups that are used for rendering contents
        this._svgData.parentGroup = svg.append("g");
        this._createDefs(svg);

        //line generator for generating relations lines
        let lineGenerator = line()
            .curve(curveBundle.beta(0.75));

        let path = this._svgData.parentGroup.append('path')
                .attr('fill', 'transparent')
                .attr('stroke', '#F8F8F8');

        this._svgData.parentGroup
            .append('circle')
                .attr("r", 5)
                .attr('cx', 250)
                .attr('cy', 200)
                .attr('fill', '#F8F8F8')
            .call(drag().on('drag', function()
            {
                let points;

                //path from right to left
                if(event.x <= event.subject.x)
                {
                    let width = event.subject.x - event.x;
                    let half = (event.y - event.subject.y) / 2;
                    
                    if(width < 12)
                    {
                        width = 12;
                    }

                    width *= 1.3;

                    points = 
                    [
                        [event.subject.x, event.subject.y],
                        [event.subject.x + width, event.subject.y + half],
                        [event.x - width, event.subject.y + half],
                        [event.x, event.y]
                    ];
                }
                else
                {
                    let width = event.x - event.subject.x;
                    let third = width / 3;
                    points = 
                    [
                        [event.subject.x, event.subject.y],
                        [event.subject.x + third, event.subject.y],
                        [event.x - third, event.y],
                        [event.x, event.y]
                    ];
                }

                path.datum(points)
                    .attr('d', lineGenerator);
            }));

        

        new SvgNode(this._svgData.parentGroup);
    }

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this.ngOnInit();
        this._changeDetector.detectChanges();
    }

    //######################### private methods #########################

    /**
     * Creates reusable definitions
     */
    private _createDefs(svg: Selection<SVGSVGElement, {}, null, undefined>)
    {
        let radialGradient = svg.append("defs")
            .append("radialGradient")
                .attr("id", "input-hover");

        radialGradient.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", "#569cd6");

        radialGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "transparent");
    }
}