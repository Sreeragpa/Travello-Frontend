import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/widgets/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../shared/widgets/header/header.component";
import { MytoastComponent } from "../../shared/widgets/mytoast/mytoast.component";
import { animation, style, animate, trigger, transition, useAnimation } from '@angular/animations';


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
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.css',
    imports: [SidebarComponent, RouterOutlet, HeaderComponent, MytoastComponent]
})
export class HomepageComponent {

}
