import {DesignerLayoutMetadata, DesignerMetadataClass} from "../interfaces";

declare var designerMetadata: boolean;

/**
 * Sets designer metadata to node on which is this decorator applied
 * @returns ClassDecorator
 */
export function DynamicNodeDesignerMetadata(templateMetadata: DesignerLayoutMetadata): ClassDecorator
{
    if(designerMetadata)
    {
        return function <TFunction extends Function> (target: TFunction): TFunction
        {
            let metadataTarget: DesignerMetadataClass = target as any;
            metadataTarget.ɵMetadata = templateMetadata;

            return target;
        };
    }

    return function <TFunction extends Function> (target: TFunction): TFunction
    {
        return target;
    };
}