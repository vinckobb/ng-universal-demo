import {ValidatorFn} from '@angular/forms';
import {ValueNamePair} from '@asseco/common';

import {DynamicNode} from '../../../ngDynamic-core';
import {DesignerMetadata} from '../metadata.interface';

//TODO: Rename LayoutMetadata to more appropriate OptionsMetadata or PropertiesMetadata



/**
 * Metadata used for designer
 */
export interface LayoutMetadata extends DesignerMetadata
{
    /**
     * Metadata for options that can be used for designing
     */
    options?: DesignerOptionsMetadata[];

    /**
     * Value that is gathered by options component
     */
    value?: any;

    /**
     * Component instance which options are currently edited
     */
    optionsComponent?: DynamicNode;
}

/**
 * Metadata for single option 
 */
export interface DesignerOptionsMetadata
{
    /**
     * Id or name of property which will be set by this option
     */
    id?: string;

    /**
     * Name of option displayed for user
     */
    name?: string;

    /**
     * Data type of option
     */
    type?: OptionType;

    /**
     * Default value that is set when creating empty control
     */
    defaultValue?: any;

    /**
     * Description of option displayed for user
     */
    description?: string;

    /**
     * If this is specified it means that user can select only from provided options
     */
    availableOptions?: ValueNamePair[];

    /**
     * Definition of options for each array item
     */
    arrayItemOptions?: DesignerOptionsMetadata[];

    /**
     * Array of validators that can be applied to option
     */
    validators?: ValidatorFn[];
}

/**
 * Available data types of options
 */
export enum OptionType
{
    /**
     * Item will be string, represented as text box
     */
    String,

    /**
     * Item will be string, transformed to number
     */
    Number,

    /**
     * Item will be boolean value, represented as checkbox
     */
    Boolean,

    /**
     * Item is array of objects
     */
    Array
}