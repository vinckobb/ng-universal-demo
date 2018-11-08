import {Observable} from "rxjs";

import {OptionComponent} from "../components/option/option.component";

/**
 * Callback used for obtaining options
 */
export interface GetOptionsCallback<TValue>
{
    /**
     * Gets array of options based on query
     * @param query Query for obtaining options
     * @param options All available options
     */
    (query: string|TValue, options?: Array<OptionComponent<TValue>>): Promise<Array<OptionComponent<TValue>>>;
}

/**
 * Function used for comparing two values
 */
export interface CompareValueFunc<TValue>
{
    /**
     * Compares two values and returns true if objects are equal, otherwise false
     * @param source First value to be compared
     * @param target Second value to be compared
     */
    (source: TValue, target: TValue): boolean;
}

/**
 * Manager used for handling options
 */
export interface OptionsAndValueManager<TValue>
{
    /**
     * Currently selected value(s)
     */
    value: TValue|Array<TValue>;

    /**
     * Occurs when value changes
     */
    valueChange: Observable<void>;

    /**
     * Array of displayed options
     */
    options: Array<OptionComponent<TValue>>;

    /**
     * Currently selected option(s)
     */
    selectedOption: OptionComponent<TValue>|Array<OptionComponent<TValue>>;

    /**
     * Sets selected option, in case of multiselect it toggles selected value
     * @param option Options to be set as selected
     */
    setSelected(option: OptionComponent<TValue>);

    /**
     * Sets value of select
     * @param value Value to be set for select
     */
    setValue(value: TValue|Array<TValue>);

    /**
     * Sets all available options
     */
    setOptions(options: Array<OptionComponent<TValue>>);

    /**
     * Registers callback used for obtaining options
     * @param callback Callback used for obtaining options
     */
    registerGetOptions(callback: GetOptionsCallback<TValue>);

    /**
     * Registers compare value function for comparing values
     * @param func Function used for comparison
     */
    registerCompareValue(func: CompareValueFunc<TValue>);
}