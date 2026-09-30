import {
  ApplicationConfig,
  isDevMode,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import {
  API_BASE_URL,
  DEV_API_CONFIG,
  PRODUCTION_API_CONFIG,
} from '@super-fitness/data-access-user';
import { AUTH_ROUTES, authInterceptor } from '@super-fitness/auth';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: AUTH_ROUTES,
      useValue: { login: '/login', authenticated: '/superFitness' },
    },
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: API_BASE_URL,
      useFactory: () =>
        (isDevMode() ? DEV_API_CONFIG : PRODUCTION_API_CONFIG).apiBaseUrl,
    },
    provideRouter(appRoutes),
  ],
};
