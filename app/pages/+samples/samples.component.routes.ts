import {GridSampleComponent} from './grid/gridSample.component';
import {BootstrapSamplesComponent} from './bootstrap/bootstrapSamples.component';
import {Utils} from '@ng/common';

export var sampleComponentRoutes = Utils.routerHelper.extractRoutes([GridSampleComponent,
                                                                     BootstrapSamplesComponent]);


export var sampleComponents = [GridSampleComponent,
                               BootstrapSamplesComponent];