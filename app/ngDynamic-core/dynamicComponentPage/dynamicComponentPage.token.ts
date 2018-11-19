import {InjectionToken} from "@angular/core";

/**
 * Injection token used for injection url prefix for obtaining dynamic component metadata
 */
export const DYNAMIC_COMPONENT_PAGE_METADATA_URL: InjectionToken<string> = new InjectionToken<string>('DynamicComponentPageMetadataUrl', {providedIn: 'root', factory: () => 'api/dynamic'});