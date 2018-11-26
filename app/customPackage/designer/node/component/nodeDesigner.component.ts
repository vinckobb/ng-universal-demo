import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, OnInit} from "@angular/core";
import {select, Selection, event, zoom} from 'd3';

import {DynamicComponentGeneric} from "../../../../ngDynamic-core";
import {SvgNode, SvgRelation} from "./misc";

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
        parentGroup?: Selection<SVGGElement, {}, null, undefined>,
        relationsGroup?: Selection<SVGGElement, {}, null, undefined>
    } = {};

    /**
     * Indication whether is currently valid drop active
     */
    private _isValidDrop: boolean = false;

    /**
     * Getter for isValidDrop
     */
    private _isValidDropFn = () => this._isValidDrop;

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
        this._svgData.relationsGroup = this._svgData.parentGroup.append("g");
        this._createDefs(svg);

        new SvgNode(this._svgData.parentGroup,
                    {
                        x: 150,
                        y: 250,
                        inputs:
                        [
                            {
                                id: 'simpleInput',
                                name: 'input',
                                type: 'string'
                            },
                            {
                                id: 'query',
                                name: 'query',
                                type: 'StringDictionary'
                            }
                        ],
                        outputs:
                        [
                            {
                                id: 'simpleOutput',
                                name: 'out',
                                type: 'string'
                            },
                            {
                                id: 'condition',
                                name: 'cond',
                                type: 'boolean'
                            }
                        ],
                        id: 'simple-component',
                        name: 'Simple component'
                    }, 
                    () => {},
                    () => new SvgRelation(this._svgData.relationsGroup, null, null, this._isValidDropFn));

        new SvgNode(this._svgData.parentGroup,
                    {
                        x: 450,
                        y: 180,
                        inputs:
                        [
                            {
                                id: 'simpleInput',
                                name: 'input',
                                type: 'string'
                            },
                            {
                                id: 'query',
                                name: 'query',
                                type: 'StringDictionary'
                            }
                        ],
                        outputs:
                        [
                            {
                                id: 'simpleOutput',
                                name: 'out',
                                type: 'string'
                            },
                            {
                                id: 'condition',
                                name: 'cond',
                                type: 'boolean'
                            }
                        ],
                        id: 'simple-component #2',
                        name: 'Simple component'
                    }, 
                    () => {},
                    () => new SvgRelation(this._svgData.relationsGroup, null, null, this._isValidDropFn));
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
        let inputGradient = svg.append("defs")
            .append("radialGradient")
                .attr("id", "input-hover");

        inputGradient.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", "#569cd6");

        inputGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "transparent");

        let outputGradient = svg.append("defs")
            .append("radialGradient")
                .attr("id", "output-hover");

        outputGradient.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", "#e99d2c");

        outputGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "transparent");
    }
}