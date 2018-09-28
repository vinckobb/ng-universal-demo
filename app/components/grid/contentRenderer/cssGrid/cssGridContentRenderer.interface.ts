import {ContentRendererOptions, ContentRendererPlugins, ContentRenderer} from "@ng/grid";

/**
 * Css classes for css grid content renderer
 */
export interface CssClassesCssGridContentRenderer
{
}

/**
 * Options for css grid content renderer
 */
export interface CssGridContentRendererOptions extends ContentRendererOptions<CssClassesCssGridContentRenderer, ContentRendererPlugins>
{
}

/**
 * Public API for CssGridContentRenderer
 */
export interface CssGridContentRenderer<TOrdering> extends ContentRenderer<TOrdering>
{
}