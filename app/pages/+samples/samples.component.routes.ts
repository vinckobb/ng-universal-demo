import {GridSampleComponent} from './grid/gridSample.component';
import {BootstrapSamplesComponent} from './bootstrap/bootstrapSamples.component';
import {CommonSamplesComponent} from './common/commonSamples.component';
import {NotificationsSampleComponent} from './notifications/notificationsSample.component';
import {AuthorizationSampleComponent} from "./authorization/authorizationSample.component";
import {Utils} from '@ng/common';
import {GridLegacySampleComponent} from './grid/gridLegacySample.component';
import {ScrollMagicSampleComponent} from './scrollMagic/scrollMagicSample.component';

export var sampleComponentRoutes = Utils.routerHelper.extractRoutes([GridSampleComponent,
                                                                     GridLegacySampleComponent,
                                                                     ScrollMagicSampleComponent,
                                                                     BootstrapSamplesComponent,
                                                                     CommonSamplesComponent,
                                                                     NotificationsSampleComponent,
                                                                     AuthorizationSampleComponent]);

export var sampleComponents = [GridSampleComponent,
                               GridLegacySampleComponent,
                               ScrollMagicSampleComponent,
                               BootstrapSamplesComponent,
                               CommonSamplesComponent,
                               NotificationsSampleComponent,
                               AuthorizationSampleComponent];