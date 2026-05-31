import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService, ToastType } from '../services/toast.service';
import { SocketioService } from '../services/socketio.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const toastService = inject(ToastService);
  const socketioService = inject(SocketioService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if ( error.status === 403) {
        socketioService.emitEvent('logout');
        authService.logout().subscribe(() => {
          socketioService.disconnectSocket();
          router.navigate(['/signin']);
          toastService.showToast("Account is Blocked",ToastType.Failure)
        })
      }
      return throwError(() => error);
    })
  );
};
