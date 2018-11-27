import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, OnInit} from "@angular/core";
import {select, Selection, event, zoom, zoomTransform} from 'd3';

import {SvgNode, SvgRelation} from "./misc";
import {SvgPeerDropArea, Coordinates, DesignerDynamicComponent, RelationsMetadata} from "../../interfaces";

/**
 * Component used for designing relation nodes
 */
@Component(
{
    selector: 'node-designer',
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
export class NodeDesignerComponent implements OnInit
{
    //######################### private fields #########################

    /**
     * All top svg objects
     */
    private _svgData:
    {
        svg?: Selection<SVGSVGElement, {}, null, undefined>,
        parentGroup?: Selection<SVGGElement, {}, null, undefined>,
        relationsGroup?: Selection<SVGGElement, {}, null, undefined>
    } = {};

    /**
     * Array of added compnents into node designer
     */
    private _addedComponents:
    {
        component: DesignerDynamicComponent;
        svgNode: SvgNode;
    }[] = [];

    /**
     * Information about active drop area
     */
    private _activeDropArea: SvgPeerDropArea = null;

    /**
     * Getter for activeDropArea
     */
    private _getDropAreaFn = () => this._activeDropArea;

    /**
     * Setter for activeDropArea
     */
    private _setDropAreaFn = (dropArea: SvgPeerDropArea) => this._activeDropArea = dropArea;

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
            svgHeight = '100%';
        this._svgData.svg = selfObj.append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .attr("style", "background-color: #1e1e1e;")
            .call($zoom);

        //creates groups that are used for rendering contents
        this._svgData.parentGroup = this._svgData.svg.append("g");
        this._svgData.relationsGroup = this._svgData.parentGroup.append("g");
        this._createDefs();
    }

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }

    /**
     * Adds component into node designer
     * @param coordinates Coordinates of newly added node
     * @param component Component to be added
     * @param metadata Metadata for component that is added
     */
    public addComponent(coordinates: Coordinates, component: DesignerDynamicComponent, metadata: RelationsMetadata)
    {
        let currentZoom = zoomTransform(this._svgData.svg.node());

        metadata.x = currentZoom.invertX(coordinates.x);
        metadata.y = currentZoom.invertY(coordinates.y);
        metadata.id = component.id,

        this._addedComponents.push(
        {
            component: component,
            svgNode: new SvgNode(this._svgData.parentGroup, 
                                 metadata, 
                                 this._setDropAreaFn,
                                 () => new SvgRelation(this._svgData.relationsGroup, null, null, this._getDropAreaFn))
        })
    }

    //######################### private methods #########################

    /**
     * Creates reusable definitions
     */
    private _createDefs()
    {
        let inputGradient = this._svgData.svg.append("defs")
            .append("radialGradient")
                .attr("id", "input-hover");

        inputGradient.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", "#569cd6");

        inputGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "transparent");

        let outputGradient = this._svgData.svg.append("defs")
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