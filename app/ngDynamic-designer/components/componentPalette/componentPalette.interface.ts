import {DesignerLayoutMetadata} from "../../interfaces";

export interface ComponentPalettePackage
{
    packageName: string,
    components: ComponentPalettePackageComponent[]
}

export interface ComponentPalettePackageComponent
{
    componentName: string,
    designerMetadata: DesignerLayoutMetadata
}