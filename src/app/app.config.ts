import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations'
import { authInterceptor } from './core/interceptor/auth.interceptor';
import { errorInterceptor } from './core/interceptor/error.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withViewTransitions()),
    provideHttpClient(withInterceptors([authInterceptor,errorInterceptor])),
    provideAnimations()]
};
