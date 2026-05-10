import { Component, EventEmitter, Output, signal } from '@angular/core';

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

  isDragOver = signal(false);
  
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);

    const file = event.dataTransfer?.files?.[0];
    this.handleFile(file);
  }

  onFile(event: Event) {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0];
    this.handleFile(file);

    // allow re-selecting same file
    if (input) input.value = '';
  }

  private handleFile(file?: File) {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.imgError.emit('The selected file is not an image.');
      return;
    }

    this.imgError.emit('');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgFile.emit(reader.result as string);
    };
  }
}
