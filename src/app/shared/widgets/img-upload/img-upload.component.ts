import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-img-upload',
  standalone: true,
  imports: [],
  templateUrl: './img-upload.component.html',
  styleUrl: './img-upload.component.css'
})
export class ImgUploadComponent {
  @Output() imgFile: EventEmitter<string> = new EventEmitter()

  
  onFile(event: any){
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgFile.emit(reader.result as string)
    };
    
  }
}
