import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
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
import { EmojiComponent, EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { PickerComponent,PickerModule} from '@ctrl/ngx-emoji-mart';
import data from '@emoji-mart/data';
import { UserService } from '../../core/services/user.service';
import IUser from '../../core/models/user.models';
import { Subject, takeUntil } from 'rxjs';
  

@Component({
    selector: 'app-singlechat',
    templateUrl: './singlechat.component.html',
    styleUrl: './singlechat.component.css',
    imports: [RouterLink, FormsModule, CommonModule, LinkifyPipe, ChatMembersComponent, DateFormatPipe, PickerComponent, EmojiModule, PickerModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SinglechatComponent implements OnDestroy {
  emojiData = data;

  text: string = '';
  membersTab = signal(false);
  constructor(
    private route: ActivatedRoute,
    private navbarVisibiltyService: NavbarVisibilityService,
    private messageService: MessageService,
    private conversationService: ConversationService,
    private socketioService: SocketioService,
    private userService: UserService
  ) { }
  private conversationid!: string
  conversation = signal<IConversation | undefined>(undefined)
  messages = signal<IMessage[]>([])
  currentUserId = signal('')
  otherMember = signal<IUser | undefined>(undefined)
  otherMemberOnline = signal(false)
  @ViewChild('chatContainer') private chatContainerRef!: ElementRef;
  showEmojiPicker = signal(false);
  private destroy$ = new Subject<void>();

  toggleEmojiPicker() {
    console.log('toggleEmojiPicker');
    this.showEmojiPicker.update((value) => !value);
  }

  addEmoji(event: any) {
    const emoji = event.emoji.native;
    this.text += emoji;
    this.showEmojiPicker.set(false);
  }

  ngOnInit() {
    this.navbarVisibiltyService.hideNavBar();

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const nextConversationId = params.get('id')!;

      if (this.conversationid && this.conversationid !== nextConversationId) {
        this.leaveConversation(this.conversationid);
      }

      this.conversationid = nextConversationId;

      if (this.conversationid) {
        this.loadConversation(this.conversationid);
      }
    });

      this.socketioService.on<IMessage>('message')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.messages.update((messages) => [...messages, res.data]);
        setTimeout(() => {
          this.scrollChatToBottom();
        }, 100);
      });

    this.socketioService.on<{ conversationId: string; userId: string; isActive: boolean }>('conversationParticipantStatus')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        const payload = res.data;

        if (
          payload.conversationId !== this.conversationid ||
          !this.otherMember()?._id ||
          payload.userId !== this.otherMember()?._id
        ) {
          return;
        }

        this.otherMemberOnline.set(payload.isActive);
      });

  }

  private loadConversation(conversationid: string) {
    this.messageService.getMessages(conversationid).subscribe({
      next: (res) => {
        this.messages.set(res.data);
        setTimeout(() => {
          this.scrollChatToBottom();
        }, 10);
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.conversationService.getSingleConversation(conversationid).subscribe({
      next: (res) => {
        this.conversation.set(res.data);
        this.currentUserId.set(res.data.currentUserId as string);
        this.setOtherMemberPresence();
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.joinConversation();
  }

  private setOtherMemberPresence() {
    const conversation = this.conversation();
    if (!conversation || conversation.isGroup) {
      this.otherMemberOnline.set(false);
      this.otherMember.set(undefined);
      return;
    }

    const otherMember = conversation.memberDetails?.find(
      (member) => member._id !== this.currentUserId()
    ) ?? conversation.memberDetails?.[0];

    this.otherMember.set(otherMember);

    if (!otherMember?._id) {
      this.otherMemberOnline.set(false);
      return;
    }

    this.userService.getUser(otherMember._id).subscribe({
      next: (res) => {
        this.otherMemberOnline.set(!!res.data?.isOnline);
        this.otherMember.update((value) => ({
          ...(value ?? {}),
          ...res.data
        }));
      },
      error: (err) => {
        console.log(err);
        this.otherMemberOnline.set(!!this.otherMember()?.isOnline);
      }
    });
  }

  

  sendMessage() {
    if (this.text.trim() && this.conversationid) {
      this.messageService.sendMessage(this.conversationid, this.text).subscribe({
        next: (res) => {
          this.text = ''
          // this.messages.push(res.data)
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

  }

  joinConversation() {
    if (!this.conversationid) {
      return;
    }

    this.socketioService.emitEvent('joinConversation', this.conversationid);
  }

  private leaveConversation(conversationid: string) {
    this.socketioService.emitEvent('leaveConversation', conversationid);
  }

  scrollChatToBottom(): void {
    try {
      this.chatContainerRef.nativeElement.scrollTop = this.chatContainerRef.nativeElement.scrollHeight;
    } catch(err) {
      console.error('Error scrolling chat container:', err);
    }
  }

  ngOnDestroy(): void {
    if (this.conversationid) {
      this.leaveConversation(this.conversationid);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

}
