import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { ConversationService } from '../../core/services/conversation.service';
import IConversation from '../../core/models/conversation.model';
import IUser from '../../core/models/user.models';
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
  conversations: IConversation[] = [];
  searchQuery: string = '';

  constructor(private navbarVisibiltyService:NavbarVisibilityService,private conversationService: ConversationService,private router: Router,private socketioService: SocketioService){}
  ngOnInit() {
    this.navbarVisibiltyService.showNavBar()
    this.searchValue.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((searchkey: string)=>this.searchQuery = searchkey.trim())
    ).subscribe()

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

  getConversationTitle(conversation: IConversation): string {
    if (conversation.isGroup) {
      return conversation.groupName?.trim() || 'Group chat';
    }

    const otherMember = this.getOtherMember(conversation);
    return otherMember?.name?.trim() || 'Chat';
  }

  getConversationAvatar(conversation: IConversation): string | undefined {
    if (conversation.isGroup) {
      return conversation.groupProfile;
    }

    return this.getOtherMember(conversation)?.profileimg;
  }

  getConversationPreview(conversation: IConversation): string {
    return conversation.latestMessage?.text?.trim() || 'No messages yet';
  }

  getConversationTime(conversation: IConversation): Date {
    return conversation.latestMessage?.createdAt || conversation.createdAt || new Date(0);
  }

  get filteredConversations(): IConversation[] {
    const query = this.searchQuery.toLowerCase().trim();

    if (!query) {
      return this.conversations;
    }

    return this.conversations.filter((conversation) => {
      const title = this.getConversationTitle(conversation).toLowerCase();
      const preview = this.getConversationPreview(conversation).toLowerCase();

      return title.includes(query) || preview.includes(query);
    });
  }

  private getOtherMember(conversation: IConversation): IUser | undefined {
    if (!conversation.memberDetails?.length) {
      return undefined;
    }

    const currentUserId = conversation.currentUserId;
    if (!currentUserId) {
      return conversation.memberDetails[0];
    }

    return conversation.memberDetails.find((member) => member._id !== currentUserId) ?? conversation.memberDetails[0];
  }

}
