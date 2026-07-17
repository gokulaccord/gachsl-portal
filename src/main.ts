import { bootstrapApplication } from '@angular/platform-browser';
import { Chart, registerables } from 'chart.js';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

Chart.register(...registerables);

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideCharts(withDefaultRegisterables())
  ]
})
.catch(err => console.error(err));