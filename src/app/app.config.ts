import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations'
import { authInterceptor } from './core/interceptor/auth.interceptor';
import { errorInterceptor } from './core/interceptor/error.interceptor';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { socketio_config } from './socketio.config';
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { environment } from '../environments/environment';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withViewTransitions()),
    provideHttpClient(withInterceptors([authInterceptor,errorInterceptor])),
    provideAnimations(),
    // importProvidersFrom(SocketIoModule.forRoot(socketio_config as SocketIoConfig))
    // Google Auth
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleClientID
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ]
};
