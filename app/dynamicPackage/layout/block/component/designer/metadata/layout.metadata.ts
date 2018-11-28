import {LayoutMetadata, PropertyType} from "../../../../../../ngDynamic-designer";

export const layoutMetadata: LayoutMetadata =
{
    name: 'block panel',
    description: 'block panel as layout component',
    properties:
    [
        {
            id: 'inline',
            name: 'inline',
            description: 'Indication whether added components are rendered in row or column',
            type: PropertyType.Boolean,
            defaultValue: false
        },
        {
            id: 'padding.top',
            name: 'top padding',
            description: 'Inset offset from top of each child of stack panel',
            type: PropertyType.Number,
            defaultValue: null
        },
        {
            id: 'padding.left',
            name: 'left padding',
            description: 'Inset offset from left of each child of stack panel',
            type: PropertyType.Number,
            defaultValue: null
        }
    ]
};