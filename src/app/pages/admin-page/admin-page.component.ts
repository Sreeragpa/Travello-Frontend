import { Component } from '@angular/core';
import { AdminHeaderComponent } from "../../shared/widgets/admin/admin-header/admin-header.component";
import { AdminSidebarComponent } from "../../shared/widgets/admin/admin-sidebar/admin-sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-admin-page',
    standalone: true,
    templateUrl: './admin-page.component.html',
    styleUrl: './admin-page.component.css',
    imports: [AdminHeaderComponent, AdminSidebarComponent,RouterOutlet]
})
export class AdminPageComponent {

}
