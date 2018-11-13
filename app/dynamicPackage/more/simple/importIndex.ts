import {noop} from '@ng/common';

import {SimpleModule} from './modules';
import {SimpleComponent} from './components';
import {NgModuleFactoryPromise} from '../../../ngDynamic-core/componentLoader/componentLoader.interface';

declare var isAot: boolean;

export const moduleFactory: Promise<NgModuleFactoryPromise> = import(`./modules/index${isAot ? '.aot' : ''}`).catch(noop);
export {SimpleComponent as component};
export {SimpleModule as module};