import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideAuth0({
      domain: environment.domain,
      clientId: environment.clientId,
      cacheLocation: 'localstorage',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: environment.audience,
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: `${environment.apiServer}/*`,
          },
        ],
      },
    }),
    { provide: 'apiServer', useValue: environment.apiServer },
    { provide: 'siteBaseUrl', useValue: '' }
  ]
};
