import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authReq = req;


  const backendApiUrl = environment.backendDomain;

  if (req.url.startsWith(backendApiUrl)) {
    // headers and withCredentials for backend API requests
    authReq = req.clone({
      headers: req.headers.set('Content-Type', 'application/json'),
      withCredentials: true
    });
  } else {
    // headers for third-party API requests
    authReq = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
      // Do not set withCredentials for third-party APIs (LocationAPI)
    });
  }
  return next(authReq);
};
