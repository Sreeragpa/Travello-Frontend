import { Component, ElementRef, ViewChild } from '@angular/core';
import { ImageGridComponent } from "../../shared/widgets/image-grid/image-grid.component";
import { PostService } from '../../core/services/post.service';
import { IPost } from '../../core/models/post.models';
import { FollowService } from '../../core/services/follow.service';
import { ImageGridSkeletonComponent } from "../../shared/widgets/image-grid-skeleton/image-grid-skeleton.component";
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import IUser from '../../core/models/user.models';

@Component({
    selector: 'app-userprofile',
    standalone: true,
    templateUrl: './userprofile.component.html',
    styleUrl: './userprofile.component.css',
    imports: [ImageGridComponent, ImageGridSkeletonComponent, RouterLink]
})
export class UserprofileComponent {
    user!: IUser
    posts!: IPost[]
    isLoading: boolean = true
    nav:string = 'posts'
    followCount!: {followingCount:number,followersCount: number} 
    toggleStatus: boolean = false
    @ViewChild('underline') underline!: ElementRef;
    @ViewChild('settings_menu') settingsmenu!: ElementRef
    constructor(private postService:PostService, private followService: FollowService, private authService: AuthService,private userService:UserService, private router: Router){}
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

        this.userService.getUser().subscribe((res)=>{
            if(res){
                console.log(res);
                
                this.user = res.data
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

      toggleSettings(){
        this.toggleStatus = !this.toggleStatus
      }

      onLogout(){
        this.authService.logout().subscribe((res)=>{
            console.log(res);
            this.router.navigate(['/signin'])
        })
      }
}
