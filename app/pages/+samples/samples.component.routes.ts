import {GridSampleComponent} from './grid/gridSample.component';
import {BootstrapSamplesComponent} from './bootstrap/bootstrapSamples.component';
import {CommonSamplesComponent} from './common/commonSamples.component';
import {NotificationsSampleComponent} from './notifications/notificationsSample.component';
import {Utils} from '@ng/common';

export var sampleComponentRoutes = Utils.routerHelper.extractRoutes([GridSampleComponent,
                                                                     BootstrapSamplesComponent,
                                                                     CommonSamplesComponent,
                                                                     NotificationsSampleComponent]);

export var sampleComponents = [GridSampleComponent,
                               BootstrapSamplesComponent,
                               CommonSamplesComponent,
                               NotificationsSampleComponent];