import {SvgNodeDynamicNode, CodeMetadata, DesignerPageComponent, CodeService} from "../../../../../../ngDynamic-designer";
import {SvgNode} from "../../../../../../ngDynamic-designer/components/nodeDesigner/misc";
import {DesignerMode} from "../../../../../../ngDynamic-designer/components/designer.interface";

/**
 * Implementation of custom SVG node for advanced text block
 */
export class TextBlockSvgNode extends SvgNode implements SvgNodeDynamicNode
{
    //######################### protected fields #########################

    /**
     * Code metadata
     */
    protected _codeMetadata: CodeMetadata =
    {
        language: 'handlebars',
        template: '',
        dynamicNodeInstance: this
    };

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
                .attr('width', 100)
                .attr('height', 20)
                .attr('fill', '#569cd6')
                .attr('rx', 6)
                .attr('ry', 6)
                .attr('style', "cursor: pointer;");

        buttonGroup.append('text')
            .text('Show template')
                .attr('x', 50)
                .attr('y', currentHeight - 11)
                .attr('fill', '#F8F8F8')
                .attr('style', "cursor: pointer;");
    }
}