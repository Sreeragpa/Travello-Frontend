import { Component, ElementRef, ViewChild } from '@angular/core';
import { ImageGridComponent } from "../../shared/widgets/image-grid/image-grid.component";
import { PostService } from '../../core/services/post.service';
import { IPost } from '../../core/models/post.models';
import { FollowService } from '../../core/services/follow.service';
import { ImageGridSkeletonComponent } from "../../shared/widgets/image-grid-skeleton/image-grid-skeleton.component";

@Component({
    selector: 'app-userprofile',
    standalone: true,
    templateUrl: './userprofile.component.html',
    styleUrl: './userprofile.component.css',
    imports: [ImageGridComponent, ImageGridSkeletonComponent]
})
export class UserprofileComponent {
    posts!: IPost[]
    isLoading: boolean = true
    nav:string = 'posts'
    followCount!: {followingCount:number,followersCount: number} 
    @ViewChild('underline') underline!: ElementRef;
    constructor(private postService:PostService, private followService: FollowService){}
    ngOnInit() {
        this.postService.getUserPosts().subscribe((res)=>{
            console.log(res);
            if(res){
                setTimeout(()=>{
                    this.isLoading = false
                },1500)
               this.posts = res.data
            }
        })

        this.followService.getFollowCount().subscribe((res)=>{
            if(res){
                console.log(res);
                
                this.followCount = res.data
            }
        })
    }

    changeNav(nav: string){
        this.nav = nav
        this.updateUnderlinePosition();
    }

    updateUnderlinePosition() {
        console.log(this.underline.nativeElement);
        
        if (this.nav === 'posts') {
          this.underline.nativeElement.style.transform = 'translateX(0%)';
        } else if (this.nav === 'trips') {
          this.underline.nativeElement.style.transform = 'translateX(320%)';
        }
      }
}
