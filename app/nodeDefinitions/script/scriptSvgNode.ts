import {SvgNodeDynamicNode, DesignerPageComponent, CodeService, CodeMetadata} from "../../ngDynamic-designer";
import {SvgNode} from "../../ngDynamic-designer/components/nodeDesigner/misc";
import {DesignerMode} from "../../ngDynamic-designer/components/designer.interface";
import {DynamicComponentRelationMetadata} from "../../ngDynamic-core";
import {transformPropertiesToOptions} from "../../ngDynamic-designer/misc";

/**
 * Implementation of custom SVG node for script
 */
export class ScriptSvgNode extends SvgNode implements SvgNodeDynamicNode
{
    //######################### protected fields #########################

    /**
     * Code metadata
     */
    protected _codeMetadata: CodeMetadata =
    {
        language: 'typescript',
        template:`
import {TransformAction} from 'node-transform';

export class TransformClass implements TransformAction
{
    /**
     * Method that transforms value into any requested value
     * @param value Value to be transformed
     */
    public transform(value: any): any
    {
        return value;
    }
}
`,
        additionalData: 
        [
            "node-transform"
        ],
        dynamicNodeInstance: this
    };

    //######################### protected properties #########################

    /**
     * Gets metadata of current node
     */
    public get metadata(): DynamicComponentRelationMetadata
    {
        this._injector.get(CodeService).getCompiled(this._codeMetadata)
            .then(result => console.log(result));

        return {
            id: this._metadata.id,
            nodeOptions: transformPropertiesToOptions(this._properties && this._properties.properties, this._properties && this._properties.value),
            nodeType: this._metadata.nodeType,
            outputs: this._getOutputs()
        };
    }

    //######################### protected methods #########################

    /**
     * Renders misc visuals
     */
    protected _renderVisuals()
    {
        super._renderVisuals();
        let currentHeight = this._getHeight();

        let buttonGroup = this._miscGroup.append('g')
            .on('click', () =>
            {
                this._injector.get(DesignerPageComponent).setMode(DesignerMode.CODE);
                this._injector.get(CodeService).showCode(this._codeMetadata);
            });

        buttonGroup.append("rect")
                .attr('x', 45)
                .attr('y', currentHeight - 25)
                .attr('width', 75)
                .attr('height', 20)
                .attr('fill', '#569cd6')
                .attr('rx', 6)
                .attr('ry', 6)
                .attr('style', "cursor: pointer;");

        buttonGroup.append('text')
            .text('Show code')
                .attr('x', 50)
                .attr('y', currentHeight - 11)
                .attr('fill', '#F8F8F8')
                .attr('style', "cursor: pointer;");
    }
}