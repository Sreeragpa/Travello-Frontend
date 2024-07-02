import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConversationService } from '../../../core/services/conversation.service';
import { SocketioService } from '../../../core/services/socketio.service';
import { IMessage } from '../../../core/models/message.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private conversationService: ConversationService,private socketioService: SocketioService){}
  conversationCount: number = 0
  ngOnInit() {
    this.getUnreadCount()
    setTimeout(() => {
      this.socketioService.on<IMessage>('newMessageNotification').subscribe((res) => {
        this.getUnreadCount()
      })
    }, 500)
  }
  
  getUnreadCount(){
    this.conversationService.getUnreadConversationCount().subscribe((res)=>{
      this.conversationCount = res.data
    })
  }
}
