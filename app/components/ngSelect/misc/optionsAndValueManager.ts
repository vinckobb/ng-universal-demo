import {ChangeDetectorRef} from '@angular/core';
import {isBlank, isPresent} from '@ng/common';
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
     * Indication whether options were initialized
     */
    private _optionsInitialized: boolean = false;

    /**
     * Array of all options
     */
    private _allOptions: Array<OptionComponent<TValue>> = [];

    /**
     * Occurs when value changes
     */
    private _valueChangeSubject: Subject<void> = new Subject<void>();

    /**
     * Array of displayed options
     */
    private _options: Array<OptionComponent<TValue>> = [];

    /**
     * Currently selected option(s)
     */
    private _selectedOption: OptionComponent<TValue>|Array<OptionComponent<TValue>>;

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
        if(!this._selectedOption || (Array.isArray(this._selectedOption) && !this._selectedOption.length))
        {
            return null;
        }

        if(this._multiselect && Array.isArray(this._selectedOption))
        {
            return this._selectedOption.map(itm => itm.value);
        }

        return (this._selectedOption as OptionComponent<TValue>).value;
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
        return this._selectedOption;
    }

    //######################### constructor #########################
    constructor(private _ngSelect: NgSelectComponent<TValue>,
                private _changeDetector: ChangeDetectorRef,
                private _multiselect: boolean,
                private _strict: boolean)
    {
    }

    //######################### public methods #########################

    /**
     * Sets selected option, in case of multiselect it toggles selected value
     * @param option Options to be set as selected
     */
    public setSelected(option: OptionComponent<TValue>)
    {
        if(this._multiselect)
        {
            if(Array.isArray(this._selectedOption))
            {
                let index = this._selectedOption.indexOf(option);

                //select
                if(index < 0)
                {
                    this._selectedOption.push(option);
                    option.selected = true;
                }
                //deselect
                else
                {
                    this._selectedOption.splice(index, 1);
                    option.selected = false;
                }

                this._selectedOption = [...this._selectedOption];
            }
        }
        else
        {
            if(this._selectedOption)
            {
                (this._selectedOption as OptionComponent<TValue>).selected = false;
            }
            
            option.selected = true;
            this._selectedOption = option;
            this._ngSelect.optionsDivVisible = false;
        }

        this._valueChangeSubject.next();
    }

    /**
     * Sets value of select
     * @param value Value to be set for select
     */
    public async setValue(value: TValue|Array<TValue>, options?: {noModelChange?: boolean})
    {
        this._allOptions.forEach(option =>option.active = option.selected = false);
        this._selectedOption = null;

        if(isPresent(value))
        {
            await this._setSelectedOptions(value);

            if(this._optionsInitialized)
            {
                await this._setSelectedOptions(value);
            }
        }

        this._changeDetector.detectChanges();

        if(!options || !options.noModelChange)
        {
            this._valueChangeSubject.next();
        }
    }

    /**
     * Sets all available options
     */
    public async setOptions(options: Array<OptionComponent<TValue>>)
    {
        this._allOptions = options || [];
        this._options = this._allOptions;

        await this._sync();
        this._strictSync();
        this._optionsInitialized = true;
    }

    /**
     * Filters displayed options using query
     * @param query Query used for filtering
     */
    public async filterOptions(query: string)
    {
        //no filtering options
        if(isBlank(query) || query === '')
        {
            this._options = [...this._allOptions];

            return;
        }

        this._options = await this._optionsObtainer(query, [...this._allOptions]);
        this._changeDetector.detectChanges();
    }

    /**
     * Registers callback used for obtaining options
     * @param callback Callback used for obtaining options
     */
    public registerGetOptions(callback: GetOptionsCallback<TValue>)
    {
        this._optionsObtainer = callback;
    }

    /**
     * Registers compare value function for comparing values
     * @param func Function used for comparison
     */
    public registerCompareValue(func: CompareValueFunc<TValue>)
    {
        this._valueComparer = func;
    }

    //######################### private methods #########################

    /**
     * Sets selected options
     * @param value Value to be set
     */
    private async _setSelectedOptions(value: TValue|Array<TValue>)
    {
        if(this._multiselect && Array.isArray(value))
        {
            if(!this._selectedOption)
            {
                this._selectedOption = [];
            }

            if(Array.isArray(this._selectedOption))
            {
                for(let x = 0; x < value.length; x++)
                {
                    let selectedOption = await this._getOption(value[x]);

                    if(!selectedOption)
                    {
                        selectedOption = 
                        {
                            value: value[x],
                            active: false,
                            selected: true
                        };
                    }

                    this._selectedOption.push(selectedOption);
                    selectedOption.selected = true;
                }
            }
        }
        else
        {
            this._selectedOption = await this._getOption(value as TValue);

            if(!this._selectedOption)
            {
                this._selectedOption = 
                {
                    value: value as TValue,
                    active: false,
                    selected: true
                };
            }

            this._selectedOption.selected = true;
        }
    }

    /**
     * Obtains option for value
     * @param value Value for which is option obtained
     */
    private async _getOption(value: TValue): Promise<OptionComponent<TValue>>
    {
        if(this._optionsObtainer)
        {
            let options = await this._optionsObtainer(value, [...this._allOptions]);

            return options.find(option => this._valueComparer(option.value, value));
        }

        return this._allOptions.find(option => this._valueComparer(option.value, value));
    }

    /**
     * Performs synchronization of values
     */
    private async _sync()
    {
        let value: TValue|Array<TValue>;

        if(this._multiselect && Array.isArray(this._selectedOption))
        {
            //empty options
            if(!this._selectedOption.length)
            {
                return;
            }

            value = this._selectedOption.map(option => option.value);
        }
        else
        {
            //empty option
            if(isBlank(this._selectedOption))
            {
                return;
            }

            value = (this._selectedOption as OptionComponent<TValue>).value;
        }

        this._selectedOption = null;
        await this._setSelectedOptions(value);
    }

    /**
     * Synchronize options and values, removes values which are not strictly contained in options
     */
    private _strictSync()
    {
        if(!this._strict)
        {
            return;
        }

        if(this._multiselect && Array.isArray(this._selectedOption))
        {
            let selectedOptions = [];

            this._selectedOption.forEach(selectedOption =>
            {
                if(this._allOptions.find(option => this._valueComparer(selectedOption.value, option.value)))
                {
                    selectedOptions.push(selectedOption);
                }
            });

            this._selectedOption = selectedOptions;
        }
        else
        {
            let selectedOption = this._selectedOption as OptionComponent<TValue>;
            
            if(!this._allOptions.find(option => this._valueComparer(selectedOption.value, option.value)))
            {
                this._selectedOption = null;
            }
        }
    }
}