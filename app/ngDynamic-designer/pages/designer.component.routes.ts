//@ts-ignore
import {Utils} from "@ng/common";
import {LayoutDesignerPageComponent} from "./layoutDesigner/layoutDesignerPage.component";

export var designerComponentRoutes = Utils.routerHelper.extractRoutes([LayoutDesignerPageComponent]);

export var designerComponents = [LayoutDesignerPageComponent];