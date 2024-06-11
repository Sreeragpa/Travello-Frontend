import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-slide-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-nav.component.html',
  styleUrl: './slide-nav.component.css'
})
export class SlideNavComponent {
  @Input({required:true}) navNames: string[] = [];
  @Output() navChange = new EventEmitter<string>();

  nav: string = ''; // Default active navigation tab

constructor() { }
ngOnInit() {
  this.nav = this.navNames[0]
}

changeNav(selectedNav: string) {
  this.nav = selectedNav;
  this.navChange.emit(selectedNav);
}
}
