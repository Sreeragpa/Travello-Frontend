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
  @Output() imgError: EventEmitter<string> = new EventEmitter();

  
  onFile(event: any){
    const file = event.target.files[0];

    if (!file) {
      return;
    }

        // Check if the file type is an image
        if (!file.type.startsWith('image/')) {
          console.error('The selected file is not an image.');
          this.imgError.emit("The selected file is not an image.")
          return; 
        }else{
          this.imgError.emit('')
        }
    

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgFile.emit(reader.result as string)
    };
    
  }
}
