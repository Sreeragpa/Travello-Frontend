import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
 

  const authService = inject(AuthService);
  const router = inject(Router)

  authService.isAuthenticated().pipe(
    tap(isAuthenticated =>{
    
      if(isAuthenticated){
        router.navigate(['/']);
        return false;
      }
      return true
    })
  ).subscribe()

  return true;
};
