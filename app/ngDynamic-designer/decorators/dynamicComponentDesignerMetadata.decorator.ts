/**
 * Sets designer metadata to component on which is this decorator applied
 * @returns ClassDecorator
 */
export function DynamicComponentDesignerMetadata(templateMetadata: any): ClassDecorator
{
    return function <TFunction extends Function> (target: TFunction): TFunction
    {        
        return target;
    };
}