import {getValue, isPresent} from "@asseco/common";

import {PropertiesPropertyMetadata} from "../interfaces";

/**
 * Transforms component or node options to properties
 * @param properties Properties descriptors
 * @param options Options instance
 */
export function transformOptionsToProperties(properties: PropertiesPropertyMetadata[], options: any)
{
    let propertiesOptions = {};

    if(!properties)
    {
        return propertiesOptions;
    }

    //TODO - add logic for collection types

    properties.forEach(option =>
    {
        let value = getValue(options, option.id);

        if(isPresent(value))
        {
            propertiesOptions[option.id] = value;
        }
    });

    return propertiesOptions;
}