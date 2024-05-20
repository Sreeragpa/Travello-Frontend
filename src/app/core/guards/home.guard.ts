import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of, tap } from 'rxjs';

export const homeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)
  
  console.log("hehe");
  
    // const isLoggedIn = localStorage.getItem('userToken') !== null;
    authService.isAuthenticated().pipe(
      tap(isAuthenticated => {
        console.log(isAuthenticated);
        
        if (!isAuthenticated) {
          console.log('not');
          
          router.navigate(['/signin']); 
          return false;
        }
        console.log('yesss');

        return true;
      })
    ).subscribe()
      console.log('hiii');
      

    return true;
};
