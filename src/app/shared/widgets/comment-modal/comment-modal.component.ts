import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { CommentService } from '../../../core/services/comment.service';

@Component({
  selector: 'app-comment-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-modal.component.html',
  styleUrl: './comment-modal.component.css'
})
export class CommentModalComponent {
  @Input() isModalVisible: boolean = false;
  visible: boolean = false
  postid!: string | boolean
  commentAnimation: boolean = false

  constructor(private commentService: CommentService){

  }
  ngOnInit() {
    this.commentService.gettoggleComment.subscribe((res)=>{
      if(res!=="false"){
        setTimeout(()=>{
        this.commentAnimation = true
        },500)
        this.postid = res
        console.log(res);
      }else{
        this.commentAnimation = false
        
        setTimeout(()=>{
          this.postid = false
          },500)
      }
    })
  }

  closeModal(event?: MouseEvent){
    this.commentService.closeComment()
  }

  preventClose(event: MouseEvent): void {
    event.stopPropagation(); // Prevent click event from propagating to modal overlay
  }

}
