import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IPost } from '../../../core/models/post.models';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { CommentService } from '../../../core/services/comment.service';
import { LikesWithMutualPipe } from '../../pipes/likes-with-mutual.pipe';
import { RouterLink } from '@angular/router';
import { TextslicePipe } from "../../pipes/textslice.pipe";
// import { IconDefinition, fa } from '@fortawesome/fontawesome-free';

@Component({
    selector: 'app-post-item',
    standalone: true,
    templateUrl: './post-item.component.html',
    styleUrl: './post-item.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [DateFormatPipe, LikesWithMutualPipe, RouterLink, TextslicePipe]
})
export class PostItemComponent {
  lastTap: number = 0;
  doubleTapTimeout: any;
onTouchStart($event: TouchEvent,postid: any) {
  const currentTime = new Date().getTime();
  const tapLength = currentTime - this.lastTap;

  clearTimeout(this.doubleTapTimeout);

  if (tapLength < 500 && tapLength > 0) {
    // Double-tap detected
    this.likeButton.emit(postid as string)
  } else {
    // Single-tap detected, start a timeout to reset the lastTap
    this.doubleTapTimeout = setTimeout(() => {
      clearTimeout(this.doubleTapTimeout);
    }, 500);
  }

  this.lastTap = currentTime;
}
test($event: Event) {
throw new Error('Method not implemented.');
}
  @ViewChild('popover') popovers!: ElementRef<HTMLDivElement>
hidePopover() {
  this.popovers.nativeElement.style.visibility = 'invisible';
  this.popovers.nativeElement.style.opacity = '0';
  
}
showPopover() {
  this.popovers.nativeElement.style.visibility = 'visible';
  this.popovers.nativeElement.style.opacity = '1';
}
  constructor(private commentService: CommentService){}
  @Input({required:true}) postdata!: IPost;
  @Output() likeButton: EventEmitter<string> = new EventEmitter()
  @Output() unlikeButton: EventEmitter<string> = new EventEmitter()
  @Output() followButton: EventEmitter<string> = new EventEmitter()
  @Output() unfollowButton: EventEmitter<string> = new EventEmitter()
  @Output() shareButton: EventEmitter<string> = new EventEmitter()
  @Output() saveButton: EventEmitter<string> = new EventEmitter()
  @Output() unsaveButton: EventEmitter<string> = new EventEmitter()
  @Output() commentButton: EventEmitter<string> = new EventEmitter()

  isLikeHover: boolean = false

  like(postid: string | undefined){
    this.likeButton.emit(postid as string)
  }

  unlike(postid: string | undefined){
    this.unlikeButton.emit(postid as string)
  }

  follow(followingid: string | undefined){
    this.followButton.emit(followingid as string)
  }
  unfollow(followingid: string | undefined){
    this.unfollowButton.emit(followingid as string)
  }

  onShare(postid:string | undefined){
    this.shareButton.emit(postid)
  }

  onSave(postid:string | undefined){
    this.saveButton.emit(postid)
  }
  onUnsave(postid:string | undefined){
    this.unsaveButton.emit(postid)
  }
  onComment(postid: string | undefined){
    // this.commentButton.emit(postid)
    this.commentService.toggleComment(postid as string)
  }

  showLikedUsersModal(){
    this.isLikeHover = true
  }

  hideLikedUsersModal(){
    this.isLikeHover = false
  }
}
