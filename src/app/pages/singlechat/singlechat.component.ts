import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MessageService } from '../../core/services/message.service';
import { ConversationService } from '../../core/services/conversation.service';
import IConversation from '../../core/models/conversation.model';
import { FormsModule } from '@angular/forms';
import { IMessage } from '../../core/models/message.model';
import { CommonModule } from '@angular/common';
import { SocketioService } from '../../core/services/socketio.service';
import { LinkifyPipe } from "../../shared/pipes/linkify.pipe";
import { ChatMembersComponent } from "../../shared/widgets/chat-members/chat-members.component";
import { DateFormatPipe } from "../../shared/pipes/date-format.pipe";
import { TimeFormatPipe } from "../../shared/pipes/time-format.pipe";
import { NavbarVisibilityService } from '../../core/services/navbar-visibility.service';

@Component({
    selector: 'app-singlechat',
    standalone: true,
    templateUrl: './singlechat.component.html',
    styleUrl: './singlechat.component.css',
    imports: [RouterLink, FormsModule, CommonModule, LinkifyPipe, ChatMembersComponent, DateFormatPipe, TimeFormatPipe]
})
export class SinglechatComponent {
  text!: string;
membersTab: boolean = false;
  constructor(private route: ActivatedRoute,private navbarVisibiltyService: NavbarVisibilityService, private messageService: MessageService, private conversationService: ConversationService, private socketioService: SocketioService) { }
  private conversationid!: string
  conversation!: IConversation
  messages!: IMessage[]
  currentUserId!: string
  @ViewChild('chatContainer') private chatContainerRef!: ElementRef;

  ngOnInit() {
    this.navbarVisibiltyService.hideNavBar()
    this.route.paramMap.subscribe((params) => {
      this.conversationid = params.get('id')!
    })
    setTimeout(() => {
      this.socketioService.on<IMessage>('message').subscribe((res) => {
        console.log(res, "socketeft");
        this.messages.push(res.data);
        setTimeout(() => {
          this.scrollChatToBottom();
        }, 100);
      })
    }, 100)

    if (this.conversationid) {
      this.messageService.getMessages(this.conversationid).subscribe({
        next: (res) => {
          console.log(res, "messages");
          this.messages = res.data;
          setTimeout(()=>{
            this.scrollChatToBottom();
           },10)
        },
        error: (err) => {
          console.log(err);
        }
      })

      this.conversationService.getSingleConversation(this.conversationid).subscribe({
        next: (res) => {
          console.log(res, "convoo");
          this.conversation = res.data
          this.currentUserId = this.conversation.currentUserId as string
        },
        error: (err) => {
          console.log(err);
        }
      })

      this.joinConversation()
    }

  

  }

  

  sendMessage() {
    console.log(this.text);
    if (this.text.trim() && this.conversationid) {
      this.messageService.sendMessage(this.conversationid, this.text).subscribe({
        next: (res) => {
          this.text = ''
          console.log(res);
          // this.messages.push(res.data)
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

  }

  joinConversation() {
    setTimeout(() => {
      this.socketioService.emit('joinConversation', this.conversationid).subscribe({
        next: (res) => {
          console.log(res, "HEHEHE");

        },
        error: (err) => {
          console.log(err, "ERERRREE");
        }
      });
    }, 1000)
  }

  scrollChatToBottom(): void {
    try {
      this.chatContainerRef.nativeElement.scrollTop = this.chatContainerRef.nativeElement.scrollHeight;
      console.log(this.chatContainerRef.nativeElement.scrollHeight);
      
    } catch(err) {
      console.error('Error scrolling chat container:', err);
    }
  }

}
