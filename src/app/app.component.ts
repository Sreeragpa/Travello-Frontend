import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SidebarComponent } from "./shared/widgets/sidebar/sidebar.component";
import { AuthService } from './core/services/auth.service';
import { NotificationService } from './core/services/notification.service';
import { SocketioService } from './core/services/socketio.service';
import { MytoastComponent } from "./shared/widgets/mytoast/mytoast.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, SidebarComponent, MytoastComponent]
})
export class AppComponent implements OnInit{
  title = 'Travello-Frontend';
  darkmode: boolean = false;
  constructor(private authService: AuthService,private socketIOService: SocketioService){}
  ngOnInit(): void {
    initFlowbite();
  }
}
