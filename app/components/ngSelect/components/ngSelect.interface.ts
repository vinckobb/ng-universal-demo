import {NgSelectComponent} from "./ngSelect.component";
import {OptionComponent} from "./option/option.component";

/**
 * Css classes used within NgSelect
 */
export interface NgSelectCssClasses
{
}

/**
 * NgSelect template context
 */
export interface NgSelectTemplateContext<TValue>
{
    /**
     * Implicit value for templates
     */
    $implicit: NgSelectComponent<TValue>;
}

/**
 * NgSelect Option template context
 */
export interface NgSelectOptionTemplateContext<TValue>
{
    /**
     * Implicit value for option templates
     */
    $implicit: OptionComponent<TValue>;

    /**
     * Instance of ng select
     */
    select: NgSelectComponent<TValue>;
}

/**
 * Public api used for communication with NgSelect
 */
export interface NgSelectApi
{
}

/**
 * Public api used for extending NgSelect
 */
export interface NgSelectCustomize extends NgSelectApi
{
}