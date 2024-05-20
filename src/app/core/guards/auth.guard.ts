import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  console.log("jj");
  let t = false;
  const authService = inject(AuthService);
  const router = inject(Router)

  authService.isAuthenticated().pipe(
    tap(isAuthenticated =>{
      console.log(isAuthenticated);
      
      if(isAuthenticated){
        router.navigate(['/']);
        return false;
      }
      return true
    })
  ).subscribe()

  return true;
};
