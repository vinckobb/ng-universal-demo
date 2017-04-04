import {GridSampleComponent} from './grid/gridSample.component';
import {BootstrapSamplesComponent} from './bootstrap/bootstrapSamples.component';
import {CommonSamplesComponent} from './common/commonSamples.component';
import {NotificationsSampleComponent} from './notifications/notificationsSample.component';
import {AuthorizationSampleComponent} from "./authorization/authorizationSample.component";
import {Utils} from '@ng/common';

export var sampleComponentRoutes = [...GridSampleComponent.ngRoutes,...BootstrapSamplesComponent.ngRoutes,...CommonSamplesComponent.ngRoutes,...NotificationsSampleComponent.ngRoutes,...AuthorizationSampleComponent.ngRoutes];

export var sampleComponents = [GridSampleComponent,
                               BootstrapSamplesComponent,
                               CommonSamplesComponent,
                               NotificationsSampleComponent,
                               AuthorizationSampleComponent];