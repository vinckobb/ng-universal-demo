import {ClassProvider, FactoryProvider, ValueProvider} from '@angular/core';
import {GlobalizationService} from '@ng/common';

import {GlobalizationService as GlobalizationServiceImpl} from '../services/globalization/globalization.service';

var providers = [];

//######################### GLOBALIZATION #########################
providers.push(<ClassProvider>
{
    provide: GlobalizationService,
    useClass: GlobalizationServiceImpl
});

export {providers};