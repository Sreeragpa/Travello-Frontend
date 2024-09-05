import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { FollowService } from '../../core/services/follow.service';
import IUser from '../../core/models/user.models';
import { IResponse } from '../../core/models/httpResponse.models';
import { ConversationService } from '../../core/services/conversation.service';
import IConversation from '../../core/models/conversation.model';
import { Router } from '@angular/router';
import { DateFormatPipe } from "../../shared/pipes/date-format.pipe";
import { TextslicePipe } from "../../shared/pipes/textslice.pipe";
import { SocketioService } from '../../core/services/socketio.service';
import { IMessage } from '../../core/models/message.model';
import { NavbarVisibilityService } from '../../core/services/navbar-visibility.service';

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
  isSearch: boolean = false
  constructor(private followService: FollowService,private navbarVisibiltyService:NavbarVisibilityService,private conversationService: ConversationService,private router: Router,private socketioService: SocketioService){}
  ngOnInit() {
    this.navbarVisibiltyService.showNavBar()
    this.searchValue.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((searchkey: string)=>searchkey.trim()?this.isSearch=true:this.isSearch=false),
      switchMap((searchkey: string)=>searchkey.trim()?this.followService.searchFollowingUsers(searchkey):of([]))
    ).subscribe({
      next:(res)=>{
        const myres = res as IResponse<IUser[]>
        this.searchResults = myres.data
      },
      error:(err)=>{
        console.log(err);
  
      }
    })

    this.getCoversation()




    setTimeout(() => {
      this.socketioService.on<IMessage>('newMessageNotification').subscribe((res) => {
        this.getCoversation()

      })
    }, 100)
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

  getCoversation(){
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

}
