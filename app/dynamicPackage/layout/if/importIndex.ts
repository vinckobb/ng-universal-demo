import {noop} from '@ng/common';

import {IfModule} from './module';
import {IfComponent} from './component';
import {NgModuleFactoryPromise} from '../../../ngDynamic-core';

declare var isAot: boolean;

export const moduleFactory: Promise<NgModuleFactoryPromise> = import(`./module/index${isAot ? '.aot' : ''}`).catch(noop);
export {IfComponent as component};
export {IfModule as module};