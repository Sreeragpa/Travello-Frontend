import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/widgets/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../shared/widgets/header/header.component";
import { MytoastComponent } from "../../shared/widgets/mytoast/mytoast.component";

@Component({
    selector: 'app-homepage',
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.css',
    imports: [SidebarComponent, RouterOutlet, HeaderComponent, MytoastComponent]
})
export class HomepageComponent {

}
