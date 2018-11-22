//@ts-ignore
import {Utils} from "@ng/common";

import {DesignerPageComponent} from "./designer.component";

export var designerComponentRoutes = Utils.routerHelper.extractRoutes([DesignerPageComponent]);

export var designerComponents = [DesignerPageComponent];