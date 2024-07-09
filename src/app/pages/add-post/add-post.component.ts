import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import Cropper from 'cropperjs';
import { MapService } from '../../core/services/map.service';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { Feature, IPlaceSuggestion } from '../../core/models/mapService.models';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastService, ToastType } from '../../core/services/toast.service';
import { IPost } from '../../core/models/post.models';
import { ImgUploadComponent } from "../../shared/widgets/img-upload/img-upload.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-post',
    standalone: true,
    templateUrl: './add-post.component.html',
    styleUrl: './add-post.component.css',
    imports: [CommonModule, FormsModule, ImgUploadComponent]
})
export class AddPostComponent {
  @ViewChild('selectedimage',{static: true}) imageRef!: ElementRef<HTMLImageElement>
  cropperInstance: any;
  croppedImages: string[] = [];
  cropActive: boolean = false;
  suggestions: Feature[] = [];
  selectedPlace:any
  caption: string = ""
  private searchvalue = new Subject<string>();
  isLoading: Boolean = false

  constructor(private mapService: MapService, private postService: PostService,private authSerive: AuthService, private toastService:ToastService, private router: Router){

  }

  ngOnInit() {
    this.searchvalue.pipe(
      debounceTime(500), 
      distinctUntilChanged(), // Ignore same search terms
      tap(value=>console.log(value)),
      // switchMap((term: string) => this.mapService.autoComplete(term))
      switchMap((term: string) => term.trim() ? this.mapService.autoComplete(term) : of([]))
    ).subscribe((data:any) => {
      console.log(data);
      this.suggestions = data.features;
      console.log(this.suggestions);
      
    })
  }

  ngAfterViewInit() {

    if (this.imageRef) {
      this.initCropper(this.imageRef.nativeElement);
    } else {
      console.error("Image element not found");
    }
  }


  // onFile(event: any){
  //   console.log("file added");
  //   this.cropActive = true;
  //   const file = event.target.files[0];

  //   if (!file) {
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     if (this.imageRef) {  // Check if imageRef is initialized
  //       const image = this.imageRef.nativeElement;
  //       image.src = reader.result as string;
  //       this.initCropper(image);
  //     } else {
  //       console.error("Image element not found"); // Handle case where element is not ready
  //     }
  //   };
    
  // }

  onFile(imgFile: string){
    console.log("file added");
    this.cropActive = true;
 
    if (!imgFile) {
      return;
    }
      if (this.imageRef) {  // Check if imageRef is initialized
        const image = this.imageRef.nativeElement;
        image.src = imgFile;
        this.initCropper(image);
      } else {
        console.error("Image element not found"); // Handle case where element is not ready
      }
    
  }


  initCropper(image: HTMLImageElement) {
    if (this.cropperInstance) {
      this.cropperInstance.destroy(); // Destroy existing cropper instance
    }
    const cropBoxOptions = {
      width: 400, // Specify the width of the crop box
      height: 500 // Specify the height of the crop box
    };

    this.cropperInstance = new Cropper(image, {
      aspectRatio: 4 / 5, // Define aspect ratio here (e.g., 4:3)
      movable: true, // Allow user to move image within crop area
      zoomable: true, // Allow user to zoom in/outch
      viewMode: 1, // Enable drag mode for repositioning image
      cropBoxResizable:true,
      cropBoxMovable:true,
      center:true,
      guides:true,
      dragMode:undefined
    });
    // this.cropperInstance.setCropBoxData({ width: 400, height: 500 });

  }

  saveCropped(){
    console.log(this.cropActive);
    this.cropActive = false;
    
    if (this.cropperInstance) {
      // const canvas = this.cropperInstance.getCroppedCanvas();
      const canvas = this.cropperInstance.getCroppedCanvas({
        width: 520,
        height: 650
    });
      if (canvas instanceof HTMLCanvasElement) {
        const dataUrl = canvas.toDataURL('image/jpeg');
        this.croppedImages.push(dataUrl)
        console.log('Cropped image data URL:', dataUrl);
      } else {
        console.error('getCroppedCanvas did not return a valid HTMLCanvasElement.');
      }
    } else {
      console.error('Cropper instance is null or undefined.');
    }
    console.log(this.croppedImages);
    this.cropperInstance.destroy();
  }

  onkeyLocationKeyUp(event: any){
    const query = event.target.value;
    this.searchvalue.next(query)
    
  }

  selectPlace(placeId: string){
    this.selectedPlace = this.suggestions.find(value=>value.properties.place_id == placeId);
    this.suggestions=[]
  }

  onUpload(){

    if(!this.selectedPlace){
      this.toastService.showToast("Enter Location",ToastType.Failure)
    }

    console.log('capt',this.caption);
    if(!this.selectedPlace || !this.caption || this.croppedImages.length===0){

      return
    }
    
    const data: IPost = {
      images: this.croppedImages,
      caption:this.caption,
      location:this.selectedPlace.geometry,
      place:this.selectedPlace.properties.formatted,
      likes: 0,
      createdAt:new Date()
    }
    console.log(data);
    this.isLoading = true
    this.postService.createPost(data).subscribe({
      next:(res)=>{
        this.isLoading = false
        this.toastService.showToast("Post Added",ToastType.Success);
        this.router.navigate(['posts'])
    },
    error:(err)=>{
      this.toastService.showToast("Something Wrong Happened",ToastType.Failure)
    }
  })
  }






}


