import {ClassProvider, FactoryProvider, ValueProvider} from '@angular/core';
import {GlobalizationService} from '@ng/common';

import {GlobalizationService as GlobalizationServiceImpl} from '../services/globalization/globalization.service';

export var providers = 
[
    //######################### GLOBALIZATION #########################
    <ClassProvider>
    {
        provide: GlobalizationService,
        useClass: GlobalizationServiceImpl
    }
];
