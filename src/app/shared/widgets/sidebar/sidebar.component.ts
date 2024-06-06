import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: Router){
  
    // this.currentUrl = this.router.url;
  }
  currentUrl: string = ''

  changeURL(route: string) {
    console.log(this.router.url);
    
    // this.currentUrl = route
    // this.router.navigate([route])
    
  }


  
}
