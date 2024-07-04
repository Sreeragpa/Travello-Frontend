import { Component } from '@angular/core';
import { AdminService } from '../../../../core/services/admin.service';
import IUser from '../../../../core/models/user.models';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-usermanagement',
  standalone: true,
  imports: [],
  templateUrl: './usermanagement.component.html',
  styleUrl: './usermanagement.component.css'
})
export class UsermanagementComponent {


  users: IUser[] = [];
  usersTemp: IUser[] = []
  private searchValue: Subject<string> = new Subject<string>()

  constructor(private adminService: AdminService){}

  ngOnInit() {
    this.adminService.getAllUsers().subscribe({
      next:(res)=>{
        this.users = res.data;
        this.usersTemp = this.users
      }
    })

    this.searchValue.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchKey: string)=>{
        return this.adminService.searchUser(searchKey)
      })
    ).subscribe({
      next:(res)=>{
        this.users = res.data;
      }
    })
  }

  onSearchKeyUp(event: KeyboardEvent) {
    const text = (event.target as HTMLInputElement).value;
    console.log(text.trim());
    
    if(text.trim()){
      this.searchValue.next(text)
    }else{
      this.users = this.usersTemp
    }
  }

  blockUser(userid: string) {
    this.adminService.blockUser(userid).subscribe({
      next:(res)=>{
        console.log(res);
        this.users.forEach((user)=>{
          if(String(user._id) === String(res.data._id)){
            console.log("hehe");
            
            user.isBlocked = true
          }
        })
        this.usersTemp = this.users

      }
    })
  }

  unBlockUser(userid: string) {
    this.adminService.unBlockUser(userid).subscribe({
      next:(res)=>{
        console.log(res);
        this.users.forEach((user)=>{
          if(String(user._id) === String(res.data._id)){
            user.isBlocked = false
          }
        })
        this.usersTemp = this.users

      }
    })
  }
    


}
