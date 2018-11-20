import {noop} from '@asseco/common';

import {NodeDesignerModule} from './module';
import {NodeDesignerComponent} from './component';
import {NgModuleFactoryPromise} from '../../../ngDynamic-core';

declare var isAot: boolean;

export const moduleFactory: Promise<NgModuleFactoryPromise> = import(`./module/index${isAot ? '.aot' : ''}`).catch(noop);
export {NodeDesignerComponent as component};
export {NodeDesignerModule as module};