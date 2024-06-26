import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { FollowService } from '../../core/services/follow.service';
import IUser from '../../core/models/user.models';
import { IResponse } from '../../core/models/httpResponse.models';
import { ConversationService } from '../../core/services/conversation.service';
import IConversation from '../../core/models/conversation.model';
import { Router } from '@angular/router';
import { DateFormatPipe } from "../../shared/pipes/date-format.pipe";
import { TextslicePipe } from "../../shared/pipes/textslice.pipe";

@Component({
    selector: 'app-chatpage',
    standalone: true,
    templateUrl: './chatpage.component.html',
    styleUrl: './chatpage.component.css',
    imports: [DateFormatPipe, TextslicePipe]
})
export class ChatpageComponent {
  private searchValue: Subject<string> = new Subject<string>();
  searchResults: IUser[] = [];
  conversations: IConversation[] = [];
  constructor(private followService: FollowService,private conversationService: ConversationService,private router: Router){}
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


    this.conversationService.getAllConversation().subscribe({
      next:(res)=>{
        console.log(res);
        this.conversations = res.data        
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

  createConversation(memberid: string){
    this.conversationService.createConversation(memberid).subscribe({
      next:(res)=>{
        this.router.navigate(['/chats',res.data._id])
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  getChat(conversationid: string){
    this.router.navigate(['/chats',conversationid])
  }

}
