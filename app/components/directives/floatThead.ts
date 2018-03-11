import {Directive, Input, AfterViewInit, OnDestroy, Inject, PLATFORM_ID} from '@angular/core';
import {isString, isBlank, Utils} from '@ng/common';
import {map} from 'rxjs/operators';
import { GridComponent, BODY_CONTENT_RENDERER, BodyContentRenderer, ContentRenderer, CONTENT_RENDERER } from '@ng/grid';
import { isPlatformBrowser } from '@angular/common';

/**
 * Default FloatTheadOptions
 */
const defaultOptions: FloatThead.FloatTheadOptions | "getRowGroups" | "reflow" = 
{
    position: 'absolute'
};

/**
 * Directive used for setting floatThead on @ng/grid
 */
@Directive(
{
    selector: "ng-grid[floatThead]",
    providers: []
})
export class FloatTheadDirective implements AfterViewInit, OnDestroy
{
    //#################### private properties #######################

    /**
     * Mutation observer for table tbody
     */
    private _mutationObserver: MutationObserver;

    /**
     * Indication that current code is running in browser
     */
    private _isBrowser: boolean = isPlatformBrowser(this._platformId);

    /**
     * Indication that component is initialized
     */
    private _initialized: boolean = false;

    /**
     * Gets jQuery object for table tbody
     */
    private _selector: JQuery;

    /**
     * floatThead options
     */
    private _options: FloatThead.FloatTheadOptions | "getRowGroups" | "reflow" = Utils.common.extend(true, {}, defaultOptions);

    //#################### public properties ########################

    /**
     * Gets or sets floatThead options
     */
    @Input()
    public set options(options: FloatThead.FloatTheadOptions | "getRowGroups" | "reflow")
    {
        this._options = Utils.common.extend(true, this._options, options);

        if (this._isBrowser &&
            this._initialized &&
            this._selector)
        {
            this._selector.floatThead(this.options);
        }
    }
    public get options(): FloatThead.FloatTheadOptions | "getRowGroups" | "reflow"
    {
        return this._options;
    }

    //######################### constructor #########################

    constructor(private _grid: GridComponent, @Inject(PLATFORM_ID) private _platformId: Object) {}

    //######################### public methods - implementation of ngAfterViewInit #########################

    /**
     * Initialize component
     */
    public ngAfterViewInit()
    {
        if (!this._isBrowser)
        {
            return;
        }

        if (!this._selector)
        {
            let contentRenderer = this._grid.getPlugin<ContentRenderer<any>>(CONTENT_RENDERER);
            this._selector = $(contentRenderer.pluginElement.nativeElement);
        }
        
        if (this._selector)
        {
            this._selector.floatThead(this.options);
        }

        if (!this._mutationObserver)
        {
            this._mutationObserver = new MutationObserver(data =>
                {
                    setTimeout(() =>
                    {
                        if (this._selector)
                        {
                            this._selector.trigger('reflow');
                        }
                    });
                }
            );

            let bodyContentRenderer = this._grid.getPlugin<BodyContentRenderer<any, any>>(BODY_CONTENT_RENDERER);

            if (bodyContentRenderer)
            {
                this._mutationObserver.observe(bodyContentRenderer.pluginElement.nativeElement, {childList: true});
            }
        }

        this._initialized = true;
    }

    //######################### public methods - implementation of ngOnDestroy #########################

    /**
     * Destroy mutation observer
     */
    public ngOnDestroy()
    {
        if (this._isBrowser &&
            this._selector)
        {
            this._selector.floatThead('destroy');
        }

        if (this._mutationObserver)
        {
            this._mutationObserver.disconnect();
            this._mutationObserver = null;
        }
    }
}