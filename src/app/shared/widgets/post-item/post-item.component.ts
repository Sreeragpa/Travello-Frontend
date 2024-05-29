import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPost } from '../../../core/models/post.models';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
// import { IconDefinition, fa } from '@fortawesome/fontawesome-free';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [DateFormatPipe],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PostItemComponent {
  @Input({required:true}) postdata!: IPost;
  @Output() likeButton: EventEmitter<string> = new EventEmitter()
  @Output() unlikeButton: EventEmitter<string> = new EventEmitter()
  @Output() followButton: EventEmitter<string> = new EventEmitter()
  @Output() unfollowButton: EventEmitter<string> = new EventEmitter()

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
}
