import { AfterViewInit, Component, ElementRef, ViewChild, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiChatService } from '../../../core/services/ai-chat.service';
import { ITrip } from '../../../core/models/trip.model';
interface Message {
  text: string;
  from: 'me' | 'them';
  time: string;
  trips?: ITrip[];
}
@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.css'
})
export class AiChatComponent {
  @ViewChild('msgList') private msgList?: ElementRef<HTMLElement>;
  @ViewChild('bottomAnchor') private bottomAnchor?: ElementRef<HTMLElement>;

  isOpen = signal(false);
  isTyping = signal(false);
  draft = '';
 
  messages = signal<Message[]>([
    {
      text:
        "Hi! I’m Travello AI 🤖\n\nTell me what kind of trip you want:\n- Starting point\n- Dates (or #days)\n- Budget\n- Interests (beach / mountains / food / adventure)\n\nExample: “Budget beach trip for 3 days from Kochi”",
      from: 'them',
      time: this.now()
    }
  ]);
 
  constructor(private aiChatService: AiChatService) {}

  toggle() {
    this.isOpen.update(v => !v);
    this.scheduleScrollToBottom();
  }

  ngAfterViewInit() {
    effect(() => {
      // Re-run on open/close, message changes, and typing indicator.
      // Scroll only when panel is open.
      this.isOpen();
      this.messages();
      this.isTyping();
      this.scheduleScrollToBottom();
    });
  }
 
  send() {
    const text = this.draft.trim();
    if (!text) return;
 
    this.messages.update(msgs => [
      ...msgs,
      { text, from: 'me', time: this.now() }
    ]);
    this.draft = '';
    this.scheduleScrollToBottom();
 
    this.isTyping.set(true);
    this.aiChatService.tripChat(text).subscribe({
      next: (res) => {
        const reply = res?.data?.reply ?? 'Sorry, I could not generate a response right now.';
        const trips = res?.data?.trips ?? [];
        this.messages.update(msgs => [
          ...msgs,
          { text: reply, from: 'them', time: this.now(), trips }
        ]);
        this.scheduleScrollToBottom();
      },
      error: () => {
        this.messages.update(msgs => [
          ...msgs,
          { text: 'Something went wrong contacting support AI. Please try again.', from: 'them', time: this.now() }
        ]);
        this.scheduleScrollToBottom();
        this.isTyping.set(false);
      },
      complete: () => {
        this.isTyping.set(false);
        this.scheduleScrollToBottom();
        this.isTyping.set(false);
      }
    });
  }
 
  private now(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }


  private scrollToBottom() {
    if (!this.isOpen()) return;
    const anchor = this.bottomAnchor?.nativeElement;
    if (!anchor) return;

    anchor.scrollIntoView({ block: 'end' });
  }

  private scheduleScrollToBottom() {
    if (!this.isOpen()) return;
    // Wait for Angular to flush DOM + CSS layout (trip cards, typing dots).
    setTimeout(() => {
      requestAnimationFrame(() => this.scrollToBottom());
    }, 0);
  }

}
