import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostItemSkeletonComponent } from "../../shared/widgets/post-item-skeleton/post-item-skeleton.component";
import { PostComponent } from "../../shared/widgets/post/post.component";

@Component({
    selector: 'app-post-single',
    standalone: true,
    templateUrl: './post-single.component.html',
    styleUrl: './post-single.component.css',
    imports: [PostItemSkeletonComponent, PostComponent]
})
export class PostSingleComponent {
  postid!: string;
  isLoading: boolean = true;
  constructor(private route: ActivatedRoute){}

  ngOnInit() {
  this.route.paramMap.subscribe((params)=>{
    this.postid = params.get('id')!
  })
  if(this.postid){

  }
  }
}
