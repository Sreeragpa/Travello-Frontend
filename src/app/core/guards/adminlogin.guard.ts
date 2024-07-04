import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { catchError, map, of } from 'rxjs';

export const adminloginGuard: CanActivateFn = (route, state) => {
  const adminService = inject(AdminService);
  const router = inject(Router)
  return adminService.isAdmin().pipe(
    map((res)=>{
      if(res.data){
        router.navigate(['/admin']);
        return false;
      }else{
        return true
      }
    }),
    catchError(()=>{
      return of(true)
    })
  )
};
