import { Component, ElementRef, ViewChild } from '@angular/core';
import { ImageGridComponent } from '../../shared/widgets/image-grid/image-grid.component';
import { PostService } from '../../core/services/post.service';
import { IPost } from '../../core/models/post.models';
import { FollowService } from '../../core/services/follow.service';
import { ImageGridSkeletonComponent } from '../../shared/widgets/image-grid-skeleton/image-grid-skeleton.component';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import IUser from '../../core/models/user.models';
import { ToastService, ToastType } from '../../core/services/toast.service';
import { TripService } from '../../core/services/trip.service';
import { ITrip } from '../../core/models/trip.model';
import { TripGridComponent } from "../../shared/widgets/trip-grid/trip-grid.component";
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css',
  imports: [ImageGridComponent, ImageGridSkeletonComponent, RouterLink, TripGridComponent]
})
export class UserprofileComponent {
  user!: IUser;
  posts!: IPost[];
  trips!: ITrip[];
  savedPosts!: IPost[];
  postLoading: boolean = true;
  tripLoading: boolean = true;
  savedLoading: boolean = true;
  nav: string = 'posts';
  followCount!: { followingCount: number; followersCount: number };
  toggleStatus: boolean = false;
  postCount: number = 0;
  tripCount: number = 0;
  profileid!: string
  @ViewChild('underline') underline!: ElementRef;
  @ViewChild('settings_menu') settingsmenu!: ElementRef;
  constructor(
    private postService: PostService,
    private followService: FollowService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastService: ToastService,
    private tripService: TripService,
    private route: ActivatedRoute,
    private googleAuthService:SocialAuthService
   
  ) { }
  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      this.profileid = param.get('id') as string ;
      this.loadCurrentUserData();
    });
  }
  loadCurrentUserData() {
    this.postService.getUserPosts(this.profileid).subscribe((res) => {

      if (res) {
        this.posts = res.data;
        setTimeout(() => {
          this.postLoading = false;
        }, 1500);
      }
    });

    this.followService.getFollowCount(this.profileid).subscribe({
      next: (res) => {
        if (res) {

          this.followCount = res.data || {
            followingCount: 0,
            followersCount: 0,
          };
        }
      },
      error: (err) => {
        this.toastService.showToast('Error', ToastType.Failure);
      },
    });

    this.userService.getUser(this.profileid).subscribe({
      next: (res) => {
        if (res) {
          this.user = res.data;
        }
      },
      error: (err) => {
        this.toastService.showToast('Error', ToastType.Failure);
      },
    });

    this.postService.getPostCount(this.profileid).subscribe({
      next: (res) => {
        this.postCount = res.data.count;
      },
      error: (err) => {
        this.toastService.showToast('Error', ToastType.Failure);
      },
    });

    this.tripService.getTripCount(this.profileid).subscribe({
      next: (res) => {
        this.tripCount = res.data.count
      },
      error: (err) => {
        console.log(err);
      }
    })
  }



  changeNav(nav: string) {
    // this.savedLoading = true;
    // this.postLoading = true;

    this.nav = nav;
    this.updateUnderlinePosition();
    if (nav == 'saved') {
      this.postService.getSavedPost().subscribe({
        next: (res) => {
          this.savedPosts = res.data;
          this.savedLoading = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (nav == 'trips') {
      this.tripService.getUserTrips(this.profileid).subscribe({
        next: (res) => {
          this.trips = res.data
        },
        error: (err) => {
          console.log(err);

        }
      })

    } else {
      this.postLoading = false;
    }
  }

  updateUnderlinePosition() {

    if (this.nav === 'posts') {
      this.underline.nativeElement.style.transform = 'translateX(0%)';
    } else if (this.nav === 'trips') {
      this.underline.nativeElement.style.transform = 'translateX(420%)';
    } else {
      this.underline.nativeElement.style.transform = 'translateX(790%)';
    }
  }

  toggleSettings() {
    this.toggleStatus = !this.toggleStatus;
  }

  onLogout() {
    this.authService.logout().subscribe((res) => {
      this.googleSignOut()
      this.router.navigate(['/signin']);
    });
  }

  googleSignOut(): void {
    this.googleAuthService.signOut();
  }


  follow(userid: string){
    this.followService.followAccount(userid).subscribe({
      next:(res)=>{
        this.user.isFollowing = true
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  unfollow(userid: string){
    this.followService.unfollowAccount  (userid).subscribe({
      next:(res)=>{
        this.user.isFollowing = false
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
