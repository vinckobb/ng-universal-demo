import {Utils} from '@ng/common';
import {FilterSampleComponent} from './filter/filterSample.componen';
import {GridLegacyBenchmarkComponent} from './benchmark/gridLegacyBenchmark.component';
import {GridBenchmarkComponent} from './benchmark/gridBenchmark.component';

export var filterComponentRoutes = Utils.routerHelper.extractRoutes([FilterSampleComponent,
                                                                     GridLegacyBenchmarkComponent,
                                                                     GridBenchmarkComponent]);

export var filterComponents = [FilterSampleComponent,
                               GridLegacyBenchmarkComponent,
                               GridBenchmarkComponent];