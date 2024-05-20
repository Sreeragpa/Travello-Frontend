import { Component, Input } from '@angular/core';
import { IPost } from '../../../core/models/post.models';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css'
})
export class PostItemComponent {
  @Input({required:true}) postdata!: IPost 
}
