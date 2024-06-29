import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { SocketioService } from '../../../core/services/socketio.service';
import { INotification } from '../../../core/models/notification.model';
import { NOTIFICATION_TYPE } from '../../../core/enums/notification.enums';
import { ToastService, ToastType } from '../../../core/services/toast.service';
import { NotificationService } from '../../../core/services/notification.service';
import { NavbarVisibilityService } from '../../../core/services/navbar-visibility.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  notificationCount: number = 0;
  navBarVisible: boolean = true;
  constructor(private router: Router,
    private socketioService: SocketioService,
    private toastService: ToastService,
    private notificationService: NotificationService,
    private navbarVisibiltyService: NavbarVisibilityService){

  } 

  ngOnInit() {
    setTimeout(()=>{
      this.socketioService.on<INotification>('notification').subscribe({
        next:(res)=>{
          this.notificationCount++;
          if(res.data.type == NOTIFICATION_TYPE.FOLLOW){
            this.toastService.showToast("User started following you",ToastType.Normal)
          }
          if(res.data.type == NOTIFICATION_TYPE.POSTLIKE){
            this.toastService.showToast("User liked your post",ToastType.Normal)
          }
          if(res.data.type == NOTIFICATION_TYPE.JOINREQUEST){
            this.toastService.showToast("User send a Join Request",ToastType.Normal)
          }
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    },100)

    this.notificationService.getNotificationCount().subscribe({
      next:(res)=>{
        console.log(res);
        this.notificationCount = res.data
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

    this.notificationService.getNotificationSignal().subscribe((res)=>{
      if(res){
        this.notificationCount++;
      }else{
        this.notificationCount--;
      }
    })

    this.navbarVisibiltyService.navBarVisible$.subscribe((visible)=>{
      console.log(visible,"vidibelel");
      this.navBarVisible = visible;
    })


  }
  currentUrl: string = ''

  changeURL(route: string) {
    console.log(this.router.url);
    
  }




  
}
