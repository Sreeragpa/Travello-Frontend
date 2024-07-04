import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService, ToastType } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if ( error.status === 403) {
        authService.logout().subscribe((res)=>{
          router.navigate(['/signin']);
          toastService.showToast("Account is Blocked",ToastType.Failure)
        })
      }
      return throwError(() => error);
    })
  );
};