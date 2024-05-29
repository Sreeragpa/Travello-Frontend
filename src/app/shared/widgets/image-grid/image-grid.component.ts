import { Component, Input } from '@angular/core';
import { IPost } from '../../../core/models/post.models';

@Component({
  selector: 'app-image-grid',
  standalone: true,
  imports: [],
  templateUrl: './image-grid.component.html',
  styleUrl: './image-grid.component.css'
})
export class ImageGridComponent {
  @Input() imgData!: IPost[]

  ngOnInit() {
    console.log(this.imgData);
    
  }
}
