import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    headers: req.headers.set('Content-Type', 'application/json'),
    withCredentials: true // Include the object literal properties
  });
  return next(authReq);
};
