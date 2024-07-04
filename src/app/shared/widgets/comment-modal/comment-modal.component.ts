import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { CommentService } from '../../../core/services/comment.service';
import { FormsModule } from '@angular/forms';
import { IComment } from '../../../core/models/comment.model';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-comment-modal',
  standalone: true,
  imports: [CommonModule,FormsModule,DateFormatPipe],
  templateUrl: './comment-modal.component.html',
  styleUrl: './comment-modal.component.css'
})
export class CommentModalComponent {
  @Input() isModalVisible: boolean = false;
  visible: boolean = false
  postid!: string | boolean
  commentAnimation: boolean = false
  commentContent: string = ''
  comments: IComment[] = []

  constructor(private commentService: CommentService){

  }
  ngOnInit() {
    this.commentService.gettoggleComment.subscribe((res)=>{
      if(res!=="false"){
        setTimeout(()=>{
        this.commentAnimation = true
        },200)
        this.postid = res

        
        this.commentService.getPostComments(this.postid).subscribe({
          next:(res)=>{
            this.comments = res.data
            console.log(this.comments);
            
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
      }else{
        this.commentAnimation = false
        console.log("hii");
        
        setTimeout(()=>{
          this.postid = false
          },200)
      }
    })
  }

  closeModal(event?: MouseEvent){
    this.commentService.closeComment()
  }

  preventClose(event: MouseEvent): void {
    event.stopPropagation(); // Prevent click event from propagating to modal overlay
  }

  addComment(){
    console.log(this.commentContent);
    this.commentContent = this.commentContent.trim()
    console.log(this.commentContent);

    if(this.commentContent.length===0 ){
      console.log("nothing");
      
    }else{
      this.commentService.addComment(this.postid as string, this.commentContent).pipe(
        switchMap(() => this.commentService.getPostComments(this.postid as string))
      ).subscribe({
        next: (res) => {
          this.comments = res.data;
          this.commentContent = ""
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    
    
    
  }

}
