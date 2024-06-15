import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of, tap } from 'rxjs';

export const homeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  console.log('hehe');

  return authService.isAuthenticated().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/signin']);
      }
    }),
    map((isAuthenticated) => isAuthenticated),
    catchError((error) => {
      router.navigate(['/signin']);
      return of(false);
    })
  );


};
