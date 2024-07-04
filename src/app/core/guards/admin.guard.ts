import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const adminService = inject(AdminService);
  const router = inject(Router);
  
  return adminService.isAdmin().pipe(
     map((res)=>{
      if(res.data){
        return true
      }else{
        router.navigate(['/login']);
        return false
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false)
    })
  )

};
