import {ChangeDetectorRef} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {OptionsAndValueManager as OptionsAndValueManagerInterface, GetOptionsCallback, CompareValueFunc} from './optionsAndValueManager.interface';
import {OptionComponent} from '../components/option/option.component';
import {NgSelectComponent} from '../components/ngSelect.component';

/**
 * Implementation of OptionsAndValueManager
 */
export class OptionsAndValueManager<TValue> implements OptionsAndValueManagerInterface<TValue>
{
    //######################### private fields #########################

    /**
     * Array of all options
     */
    private _allOptions: Array<OptionComponent<TValue>> = [];

    /**
     * Currently selected value
     */
    private _value: TValue|Array<TValue>;

    /**
     * Occurs when value changes
     */
    private _valueChangeSubject: Subject<void>;

    /**
     * Array of displayed options
     */
    private _options: Array<OptionComponent<TValue>> = [];

    /**
     * Currently selected option(s)
     */
    private _selectedOptions: OptionComponent<TValue>|Array<OptionComponent<TValue>>;

    /**
     * Value comparer used for value comparison
     */
    private _valueComparer: CompareValueFunc<TValue>;

    /**
     * Options obtainer used for obtaining options
     */
    private _optionsObtainer: GetOptionsCallback<TValue>;

    //######################### public properties #########################

    /**
     * Currently selected value
     */
    public get value(): TValue|Array<TValue>
    {
        return this._value;
    }

    /**
     * Occurs when value changes
     */
    public get valueChange(): Observable<void>
    {
        return this._valueChangeSubject.asObservable();
    }

    /**
     * Array of displayed options
     */
    public get options(): Array<OptionComponent<TValue>>
    {
        return this._options;
    }

    /**
     * Currently selected option(s)
     */
    public get selectedOption(): OptionComponent<TValue>|Array<OptionComponent<TValue>>
    {
        return this._selectedOptions;
    }

    //######################### constructor #########################
    constructor(private _ngSelect: NgSelectComponent<TValue>,
                private _changeDetector: ChangeDetectorRef,
                private _multiselect: boolean)
    {
    }

    //######################### public methods #########################

    /**
     * Sets selected option, in case of multiselect it toggles selected value
     * @param option Options to be set as selected
     */
    public setSelected(option: OptionComponent<TValue>)
    {

    }

    /**
     * Sets value of select
     * @param value Value to be set for select
     */
    public setValue(value: TValue|Array<TValue>)
    {
        this._value = value;

        this._setSelected();
    }

    /**
     * Sets all available options
     */
    public setOptions(options: Array<OptionComponent<TValue>>)
    {

    }

    /**
     * Registers callback used for obtaining options
     * @param callback Callback used for obtaining options
     */
    public registerGetOptions(callback: GetOptionsCallback<TValue>)
    {
        
    }

    /**
     * Registers compare value function for comparing values
     * @param func Function used for comparison
     */
    public registerCompareValue(func: CompareValueFunc<TValue>)
    {
        
    }

    //######################### private methods #########################

    /**
     * Toggles selected/deselected value
     * @param value Value to be selected/deselected
     */
    private toggleValue(value: TValue)
    {
        if(this._multiselect)
        {
            if(!this._value)
            {
                this._value = [];
            }

            if(Array.isArray(this._value))
            {
                let index = this._value.indexOf(value);

                //select
                if(index < 0)
                {
                    this._value.push(value);
                }
                //deselect
                else
                {
                    this._value.splice(index, 1);
                }

                this._value = [...this._value];
            }
        }
        else
        {
            this._value = value;
        }

        this._setSelected();

        if(!this._multiselect)
        {
            this._ngSelect.optionsDivVisible = false;
        }
    }

    /**
     * Sets selected indications
     */
    private _setSelected()
    {
        if(this._multiselect && Array.isArray(this._value))
        {
            let value = this._value;

            this.options.forEach(option =>
            {
                option.selected = !!value.find(itm => this._valueComparer(itm, option.value));
            });
        }
        else
        {
            this.options.forEach(option =>
            {
                option.selected = this._valueComparer(option.value, this._value as TValue);
            });
        }
    }
}