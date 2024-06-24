import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { FollowService } from '../../core/services/follow.service';
import IUser from '../../core/models/user.models';
import { IResponse } from '../../core/models/httpResponse.models';

@Component({
  selector: 'app-chatpage',
  standalone: true,
  imports: [],
  templateUrl: './chatpage.component.html',
  styleUrl: './chatpage.component.css'
})
export class ChatpageComponent {
  private searchValue: Subject<string> = new Subject<string>();
  searchResults: IUser[] = []
  constructor(private followService: FollowService){}
  ngOnInit() {
    this.searchValue.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchkey: string)=>searchkey.trim()?this.followService.searchFollowingUsers(searchkey):of([]))
    ).subscribe({
      next:(res)=>{
        const myres = res as IResponse<IUser[]>
        console.log(res,"RESSS");
        this.searchResults = myres.data
      },
      error:(err)=>{
        console.log(err);
  
      }
    })
  }
  onSearch($event: any) {
    let query = $event.target.value;
    this.searchValue.next(query)
  }

}
