import { Component, Input } from '@angular/core';
import { IPost } from '../../../core/models/post.models';
import { RouterLink } from '@angular/router';
import { ImageGridSkeletonComponent } from "../image-grid-skeleton/image-grid-skeleton.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-image-grid',
    standalone: true,
    templateUrl: './image-grid.component.html',
    styleUrl: './image-grid.component.css',
    imports: [RouterLink, ImageGridSkeletonComponent,CommonModule]
})
export class ImageGridComponent {
  @Input() imgData!: IPost[]
  @Input() isLoading: boolean = true
  transition:boolean = false

  ngOnInit() {
    
  }

}
