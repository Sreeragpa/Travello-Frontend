import { Component } from '@angular/core';
import { AdminService } from '../../../../core/services/admin.service';
import IUser from '../../../../core/models/user.models';

@Component({
  selector: 'app-usermanagement',
  standalone: true,
  imports: [],
  templateUrl: './usermanagement.component.html',
  styleUrl: './usermanagement.component.css'
})
export class UsermanagementComponent {
  users: IUser[] = []
  constructor(private adminService: AdminService){}

  ngOnInit() {
    this.adminService.getAllUsers().subscribe({
      next:(res)=>{
        this.users = res.data
      }
    })
  }
}
