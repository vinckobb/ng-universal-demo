import {DesignerMetadata} from "../interfaces";

declare var designerMetadata: boolean;

/**
 * Sets designer metadata to component on which is this decorator applied
 * @returns ClassDecorator
 */
export function DynamicComponentDesignerMetadata(templateMetadata: DesignerMetadata): ClassDecorator
{
    if(designerMetadata)
    {
        return function <TFunction extends Function> (target: TFunction): TFunction
        {
            console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', target);

            return target;
        };
    }

    return function <TFunction extends Function> (target: TFunction): TFunction
    {
        return target;
    };
}