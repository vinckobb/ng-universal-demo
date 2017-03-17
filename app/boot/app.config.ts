import {ClassProvider, FactoryProvider, ValueProvider} from '@angular/core';
import {GlobalizationService, ProgressIndicatorService} from '@ng/common';

import {GlobalizationService as GlobalizationServiceImpl} from '../services/globalization/globalization.service';

export var providers = 
[
    //######################### PROGRESS INDICATOR #########################
    ProgressIndicatorService,

    //######################### GLOBALIZATION #########################
    <ClassProvider>
    {
        provide: GlobalizationService,
        useClass: GlobalizationServiceImpl
    }
];
