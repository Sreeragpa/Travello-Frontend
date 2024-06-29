import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConversationService } from '../../../core/services/conversation.service';
import IConversation from '../../../core/models/conversation.model';
import { MessageService } from '../../../core/services/message.service';
import { ToastService, ToastType } from '../../../core/services/toast.service';

@Component({
  selector: 'app-chat-modal',
  standalone: true,
  imports: [],
  templateUrl: './chat-modal.component.html',
  styleUrl: './chat-modal.component.css'
})
export class ChatModalComponent {

  @Input() message: string = ''
  @Input() chatvisible: boolean = false;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter()
  @Input() title!: string
  conversations!: IConversation[];
  conversationID!: string
  constructor(private conversationService: ConversationService,private messageService: MessageService,private toastService: ToastService){}

  ngOnInit() {
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

  sharetoChatModal() {
    this.toggle.emit(true)
  }

  onSend(){
    console.log(this.message,this.conversationID);
    this.messageService.sendMessage(this.conversationID,this.message).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastService.showToast("Post Shared",ToastType.Normal);
        this.sharetoChatModal()
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
  }
  selectConverstion(conversationid: string) {
    this.conversationID = conversationid
    }

    copyLink(postId: string) {
      const link = this.message
      navigator.clipboard.writeText(link).then(() => {
        this.sharetoChatModal()
          this.toastService.showToast('Link copied to clipboard!', ToastType.Success);
      }).catch(err => {
          this.toastService.showToast('Failed to copy link', ToastType.Failure);
          console.error('Could not copy text: ', err);
      });
  }

}
