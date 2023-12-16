import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      AuthModule.forRoot({
        domain: 'dev-yykxm3uopkevnok7.eu.auth0.com',
        clientId: '2YfPiqKOBag2bjkbxe6kJRUg3HxMbLso',
        cacheLocation: 'localstorage',
        authorizationParams: {
          redirect_uri: window.location.origin,
        },
      }),
    )]
};
