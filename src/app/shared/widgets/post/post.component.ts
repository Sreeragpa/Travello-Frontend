import { Component } from '@angular/core';
import { PostItemComponent } from "../post-item/post-item.component";
import { PostService } from '../../../core/services/post.service';
import { IPost } from '../../../core/models/post.models';
import { IResponse } from '../../../core/models/httpResponse.models';

@Component({
    selector: 'app-post',
    standalone: true,
    templateUrl: './post.component.html',
    styleUrl: './post.component.css',
    imports: [PostItemComponent]
})
export class PostComponent {
     posts!: IPost[]
    constructor(private postService: PostService){}
    ngOnInit() {
        this.postService.getAllPosts().subscribe((res)=>{
            console.log(res);
            if(res){
               this.posts = res.data
            }
        })
    }
}
