import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  constructor(private router: Router, private adminService: AdminService){}
  logOut(){
    this.adminService.logOut().subscribe({
      next:(res)=>{
        if(res.data){
            this.router.navigate(['/admin/login'])
        }
      }
    })
  }

}
