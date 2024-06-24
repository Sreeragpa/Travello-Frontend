import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of, take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
 

  const authService = inject(AuthService);
  const router = inject(Router)

  return authService.isAuthenticated().pipe(
    // take(1),
    map(isAuthenticated => {
      if (isAuthenticated) {
        router.navigate(['/']);
        return false;
      }
      return true;
    }),
    catchError(err => {
      console.error('Error during authentication check', err);
      return of(false);
    })
  );
};

