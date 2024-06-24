import { Component } from '@angular/core';
import { PostItemComponent } from "../../shared/widgets/post-item/post-item.component";
import { PostService } from '../../core/services/post.service';
import { IPost } from '../../core/models/post.models';
import { IResponse } from '../../core/models/httpResponse.models';
import { FollowService } from '../../core/services/follow.service';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { PostItemSkeletonComponent } from "../../shared/widgets/post-item-skeleton/post-item-skeleton.component";
import { ActivatedRoute } from '@angular/router';
import { ToastService, ToastType } from '../../core/services/toast.service';
import { CommentModalComponent } from "../../shared/widgets/comment-modal/comment-modal.component";

@Component({
    selector: 'app-post',
    standalone: true,
    templateUrl: './post.component.html',
    styleUrl: './post.component.css',
    imports: [PostItemComponent, PostItemSkeletonComponent, CommentModalComponent]
})
export class PostComponent {

    posts!: IPost[]
    isLoading: boolean = true
    private likeSubject = new Subject<string>();
    private unlikeSubject = new Subject<string>();
    postid!: string;
    iscommentVisible: boolean = false

    constructor(private postService: PostService, private followService: FollowService, private route: ActivatedRoute, private toastService: ToastService) { }
    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.postid = params.get('id')!
        })
        if (this.postid) {
            console.log(this.postid);
            this.postService.getSinglePost(this.postid).subscribe((res) => {
                console.log(res);
                if (res) {
                    setTimeout(() => {
                        this.isLoading = false
                    }, 1000)
                    this.posts = res.data;
                    console.log(this.posts);
                    
                }
            })

        } else {
            this.postService.getAllPosts().subscribe((res) => {
                console.log(res);
                if (res) {
                    setTimeout(() => {
                        this.isLoading = false
                    }, 1000)
                    this.posts = res.data
                }
            })
        }


        this.likeSubject.pipe(
            debounceTime(300),
            switchMap(postid => this.postService.likePost(postid))
        ).subscribe({
            next: (res) => {
                console.log(res);
                if (res) {
                    this.posts.map((post) => {
                        if (post._id == res.data.post_id) {
                            post.isLiked = !post.isLiked
                            post.likes += 1
                        }
                    })
                }

            },
            error: (err) => {
                this.toastService.showToast("Error in like", ToastType.Failure)
            }
        })

        this.unlikeSubject.pipe(
            debounceTime(300),
            switchMap(postid => this.postService.unlikePost(postid))
        ).subscribe({
            next: (res) => {
                console.log(res);
                if (res) {
                    this.posts.map((post) => {
                        if (post._id == res.data.post_id) {
                            post.isLiked = !post.isLiked
                            post.likes -= 1
                        }
                    })
                }

            },
            error: (err) => {
                this.toastService.showToast("Error in unlike", ToastType.Failure)
            }
        })

        // setTimeout(()=>{
        //     this.isLoading = false
        // },2000)
    }

    likePost(postid: string) {
        console.log('Like pressed');
        this.likeSubject.next(postid)
    }

    unlikePost(postid: string) {
        this.unlikeSubject.next(postid)
    }

    followAccount(followingid: string) {
        this.followService.followAccount(followingid).subscribe({
            next: (res) => {
                console.log(res);
                if (res) {
                    this.posts.map((post) => {
                        if (post.creator_id == followingid) {
                            post.isFollowing = true
                        }
                    })
                }

            },
            error: (error) => {
                this.toastService.showToast("Something Wrong Happened", ToastType.Failure)
            }
        })
    }
    unfollowAccount(followingid: string) {
        this.followService.unfollowAccount(followingid).subscribe({
            next: (res) => {
                if (res) {
                    this.posts.map((post) => {
                        if (post.creator_id == followingid) {
                            post.isFollowing = false
                        }
                    })
                }

            },
            error: (error) => {
                this.toastService.showToast("Something Wrong Happened", ToastType.Failure)
            }
        })
    }
    copyLink(postId: string) {
        const link = `${window.location.origin}/posts/${postId}`;
        navigator.clipboard.writeText(link).then(() => {
            this.toastService.showToast('Link copied to clipboard!', ToastType.Success);
        }).catch(err => {
            this.toastService.showToast('Failed to copy link', ToastType.Failure);
            console.error('Could not copy text: ', err);
        });
    }

    savePost(postid: string) {
        this.postService.savePost(postid).subscribe({
            next: (res) => {
                console.log(res);
                this.posts.map(post => {
                    if (res.data.post_id == post._id) {
                        post.isSaved = true
                    }
                })
            },
            error: (err) => {
                console.log(err);

            }
        })
    }
    unsavePost(postid: string) {
        this.postService.unsavePost(postid).subscribe({
            next: (res) => {
                console.log(res);
                this.posts.map(post => {
                    if (res.data.post_id == post._id) {
                        post.isSaved = false
                    }
                })
            },
            error: (err) => {
                console.log(err);

            }
        })
    }

    showComment(postid: string) {
        this.iscommentVisible = true
        console.log(postid);
        
    }
}
