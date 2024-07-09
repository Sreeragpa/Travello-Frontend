import { Component } from '@angular/core';
import { AdminHeaderComponent } from "../../shared/widgets/admin/admin-header/admin-header.component";
import { AdminSidebarComponent } from "../../shared/widgets/admin/admin-sidebar/admin-sidebar.component";
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-admin-page',
    standalone: true,
    templateUrl: './admin-page.component.html',
    styleUrl: './admin-page.component.css',
    imports: [AdminHeaderComponent, AdminSidebarComponent,RouterOutlet]
})
export class AdminPageComponent {
    showSidebar: boolean = true;
    constructor(private router: Router){}
    
    ngOnInit() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(()=>{
            this.showSidebar = !this.router.url.includes('/admin/login')
        })
    }

}
