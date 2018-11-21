import {ComponentDesignerMetadata, DesignerDynamicComponent} from "../interfaces";

declare var designerMetadata: boolean;

/**
 * Sets designer metadata to component on which is this decorator applied
 * @returns ClassDecorator
 */
export function DynamicComponentDesignerMetadata(templateMetadata: ComponentDesignerMetadata): ClassDecorator
{
    if(designerMetadata)
    {
        return function <TFunction extends Function> (target: TFunction): TFunction
        {
            let metadataTarget: DesignerDynamicComponent = target as any;
            metadataTarget.ɵMetadata = templateMetadata;

            return target;
        };
    }

    return function <TFunction extends Function> (target: TFunction): TFunction
    {
        return target;
    };
}