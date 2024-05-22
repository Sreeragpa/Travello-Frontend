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
     isLoading: boolean = true
    constructor(private postService: PostService){}
    ngOnInit() {
        this.postService.getAllPosts().subscribe((res)=>{
            console.log(res);
            if(res){
               this.posts = res.data
            }
        })

        setTimeout(()=>{
            this.isLoading = false
        },2000)
    }

    likePost(postid: string){
        console.log('Like pressed');
        
        this.postService.likePost(postid).subscribe((res)=>{
            console.log(res);
            if(res){
                this.posts.map((post)=>{
                    if(post._id == postid){
                        post.isLiked = !post.isLiked
                        post.likes+=1
                    }
                })
            }
            
        })
    }

    unlikePost(postid: string){
        this.postService.unlikePost(postid).subscribe((res)=>{
            console.log(res);
            if(res){
                    this.posts.map((post)=>{
                    if(post._id == postid){
                        post.isLiked = !post.isLiked
                        post.likes-=1
                    }
                })
            }
            
        })
    }
}
