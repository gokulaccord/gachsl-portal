import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        authInterceptor,
        loaderInterceptor
      ])
    )
  ]
};