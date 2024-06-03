import { Component, Input } from '@angular/core';
import { IPost } from '../../../core/models/post.models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-image-grid',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './image-grid.component.html',
  styleUrl: './image-grid.component.css'
})
export class ImageGridComponent {
  @Input() imgData!: IPost[]

  ngOnInit() {
    console.log(this.imgData);
    
  }
}
