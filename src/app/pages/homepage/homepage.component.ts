import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarComponent } from '../../shared/widgets/sidebar/sidebar.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../shared/widgets/header/header.component";
import { MytoastComponent } from "../../shared/widgets/mytoast/mytoast.component";
import { animation, style, animate, trigger, transition, useAnimation } from '@angular/animations';
import { AuthService } from '../../core/services/auth.service';
import { SocketioService } from '../../core/services/socketio.service';
import { NavbarVisibilityService } from '../../core/services/navbar-visibility.service';
import { ScrollService } from '../../core/services/scroll.service';
import { AiChatComponent } from '../../shared/widgets/ai-chat/ai-chat.component';

export const componentFadeInAnimation = animation([
    style({ opacity: 0 }), // Initial state: 0 opacity (invisible)
    animate('200ms ease-in-out', style({ opacity: 1 })) // Transition to full opacity
  ]);
  
  export const componentFadeInTrigger = trigger('componentFadeIn', [
    transition('void => *', [ // Trigger on entering the view
      useAnimation(componentFadeInAnimation)
    ])
  ]);
  

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.css',
    imports: [SidebarComponent, RouterOutlet, HeaderComponent, AiChatComponent]
})
export class HomepageComponent implements OnInit,OnDestroy {
  private isAtBottom = false;
  constructor(
    private authService: AuthService,
    private socketIOService: SocketioService,
    private navbarVisibiltyService: NavbarVisibilityService,
    private router: Router,
    private scrollService: ScrollService
  ){}
  ngOnDestroy(): void {
    this.socketIOService.disconnectSocket()
  }

  onScroll(event: Event) {
    const container = event.target as HTMLElement | null;
    if (!container) {
      return;
    }

    const threshold = 200;
    const reachedBottom =
      container.scrollTop + container.clientHeight >= container.scrollHeight - threshold;

    if (reachedBottom && !this.isAtBottom) {
      this.isAtBottom = true;
      this.scrollService.emitScrollSubject();
      return;
    }

    if (!reachedBottom) {
      this.isAtBottom = false;
    }
  }
  
  ngOnInit(): void {
    const token = this.authService.getAuthToken().subscribe((res)=>{
      if(res.data){
        this.socketIOService.connectWithToken(res.data as string)
      }
    }); 

    
  }
}
