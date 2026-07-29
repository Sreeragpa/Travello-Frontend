import { Component, OnDestroy, signal } from '@angular/core';
import { PostItemComponent } from "../../shared/widgets/post-item/post-item.component";
import { PostService } from '../../core/services/post.service';
import { IPost } from '../../core/models/post.models';
import { FollowService } from '../../core/services/follow.service';
import { Subject, Subscription, debounceTime, switchMap } from 'rxjs';
import { PostItemSkeletonComponent } from "../../shared/widgets/post-item-skeleton/post-item-skeleton.component";
import { ActivatedRoute } from '@angular/router';
import { ToastService, ToastType } from '../../core/services/toast.service';
import { CommentModalComponent } from "../../shared/widgets/comment-modal/comment-modal.component";
import { ChatModalComponent } from "../../shared/widgets/chat-modal/chat-modal.component";
import { ScrollService } from '../../core/services/scroll.service';



@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrl: './post.component.css',
    imports: [PostItemComponent, PostItemSkeletonComponent, CommentModalComponent, ChatModalComponent]
})
export class PostComponent {
    chatModal = signal(false);
    link = signal('');
    sharetoChatModal(postId?: string) {
        this.link.set(`${window.location.origin}/posts/${postId}`);
        this.chatModal.update((value) => !value);
    }


    posts = signal<IPost[]>([]);
    isLoading = signal(true);
    private likeSubject = new Subject<string>();
    private unlikeSubject = new Subject<string>();
    postid!: string;
    iscommentVisible = signal(false);
    currentPage: number = 1;
    private isLoadingMore = false;
    private routeSubscription?: Subscription;
    private scrollSubscription?: Subscription;



    constructor(
        private postService: PostService, 
        private followService: FollowService, 
        private route: ActivatedRoute, 
        private toastService: ToastService,
        private scrollService: ScrollService
    ) { }
    ngOnInit() {
        this.routeSubscription = this.route.paramMap.subscribe((params) => {
            this.postid = params.get('id') ?? '';
            this.resetState();

            if (this.postid) {
                this.loadSinglePost(this.postid);
            } else {
                this.loadFeed();
            }
        });


        this.likeSubject.pipe(
            debounceTime(300),
            switchMap(postid => this.postService.likePost(postid))
        ).subscribe({
            next: (res) => {

                if (res) {
                    this.posts.update((posts) => posts.map((post) => {
                        if (post._id == res.data.post_id) {
                            return {
                                ...post,
                                isLiked: !post.isLiked,
                                likes: post.likes + 1
                            };
                        }
                        return post;
                    })
                    );
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
  
                if (res) {
                    this.posts.update((posts) => posts.map((post) => {
                        if (post._id == res.data.post_id) {
                            return {
                                ...post,
                                isLiked: !post.isLiked,
                                likes: post.likes - 1
                            };
                        }
                        return post;
                    }))
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

    getAllPosts(){
        this.postService.getAllPosts(this.currentPage).subscribe((res) => {
            if (res) {
                this.posts.set(res.data);
                setTimeout(() => {
                    this.isLoading.set(false);
                }, 1000)
            }
        })
    }

    ngOnDestroy(): void {
        this.routeSubscription?.unsubscribe();
        this.scrollSubscription?.unsubscribe();
    }

    private resetState() {
        this.currentPage = 1;
        this.isLoadingMore = false;
        this.isLoading.set(true);
        this.posts.set([]);
        this.scrollSubscription?.unsubscribe();
        this.scrollSubscription = undefined;
    }

    private loadSinglePost(postid: string) {
        this.postService.getSinglePost(postid).subscribe((res) => {
            if (res) {
                this.posts.set(res.data);
                setTimeout(() => {
                    this.isLoading.set(false);
                }, 1000)
            }
        });
    }

    private loadFeed() {
        this.getAllPosts();
        this.scrollSubscription = this.scrollService.scroll$.subscribe(() => {
            if (this.isLoadingMore || this.isLoading()) {
                return;
            }
            this.currentPage++;
            this.loadmorePosts();
        });
    }

    loadmorePosts(){
        this.isLoadingMore = true;
        this.postService.getAllPosts(this.currentPage).subscribe((res) => {
            if (res) {
                if (res.data.length > 0) {
                    this.posts.update((posts) => [...posts, ...res.data]);
                }
                if (res.data.length === 0) {
                    this.currentPage--;
                }
            }
        }).add(() => {
            this.isLoadingMore = false;
        })
    }

    likePost(postid: string) {

        const likedpost = this.posts().find((post)=>{return post._id == postid})
        if(!likedpost?.isLiked){
            this.likeSubject.next(postid)
        }
    }

    unlikePost(postid: string) {
        this.unlikeSubject.next(postid)
    }

    followAccount(followingid: string) {
        this.followService.followAccount(followingid).subscribe({
            next: (res) => {
    
                if (res) {
                    this.posts.update((posts) => posts.map((post) => post.creator_id == followingid
                        ? { ...post, isFollowing: true }
                        : post));
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
                    this.posts.update((posts) => posts.map((post) => post.creator_id == followingid
                        ? { ...post, isFollowing: false }
                        : post));
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

                this.posts.update((posts) => posts.map((post) => res.data.post_id == post._id
                    ? { ...post, isSaved: true }
                    : post));
            },
            error: (err) => {
                console.log(err);

            }
        })
    }
    unsavePost(postid: string) {
        this.postService.unsavePost(postid).subscribe({
            next: (res) => {
                this.posts.update((posts) => posts.map((post) => res.data.post_id == post._id
                    ? { ...post, isSaved: false }
                    : post));
            },
            error: (err) => {
                console.log(err);

            }
        })
    }

    showComment(postid: string) {
        this.iscommentVisible.set(true);

    }
}
