import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SidebarComponent } from "./shared/widgets/sidebar/sidebar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, SidebarComponent]
})
export class AppComponent implements OnInit{
  title = 'Travello-Frontend';
  darkmode: boolean = false;
  ngOnInit(): void {
    initFlowbite();
  }
}
