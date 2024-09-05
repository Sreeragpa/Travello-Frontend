import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appScrollLoad]',
  standalone: true
})
export class ScrollLoadDirective {
  @Output() loadMore = new EventEmitter();
  private prevScrollTop = 0;
  constructor(private el: ElementRef) {}

  @HostListener('scroll', ['$event'])
  onScroll() {
    // if (this.shouldLoad()) {
    //   console.log("Should load");
    //   this.loadMore.emit();
    // }
    this.checkScroll()
    
  }


  
  private checkScroll() {
    const containerBottomPosition = this.el.nativeElement.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    

    if (containerBottomPosition <= windowHeight) {
      this.loadMore.emit();
    }
  }
  

}
