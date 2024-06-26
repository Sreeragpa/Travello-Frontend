import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, tap, switchMap, of } from 'rxjs';
import { Feature } from '../../../core/models/mapService.models';
import { IPost } from '../../../core/models/post.models';
import { ITripForm, ITrip, ITripEditForm } from '../../../core/models/trip.model';
import { AuthService } from '../../../core/services/auth.service';
import { MapService } from '../../../core/services/map.service';
import { ToastService, ToastType } from '../../../core/services/toast.service';
import { TripService } from '../../../core/services/trip.service';
import { ImgUploadComponent } from "../img-upload/img-upload.component";
import Cropper from 'cropperjs';


@Component({
    selector: 'app-edit-trip',
    standalone: true,
    templateUrl: './edit-trip.component.html',
    styleUrl: './edit-trip.component.css',
    imports: [ReactiveFormsModule, ImgUploadComponent]
})
export class EditTripComponent {
  

  @ViewChild('selectedimage',{static: true}) imageRef!: ElementRef<HTMLImageElement>
  cropperInstance: any;
  croppedImages: string[] = [];
  cropActive: boolean = false;

  caption: string = ""
  tripid!: string
  isLoading: Boolean = false
  tripEditForm!: FormGroup
  prevData!: ITrip

  constructor(
    private tripService: TripService,
    private toastService:ToastService, 
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
    
  ){
    this.tripEditForm = this.fb.group({
      title: new FormControl('',[]),
      memberlimit: new FormControl('',[]),
      description: new FormControl('',[]),
    })

  }
  ngOnInit() {
    this.route.paramMap.subscribe((params)=>{
      this.tripid = params.get('id')!
    })

    if(this.tripid){
      this.tripService.getSingleTrip(this.tripid).subscribe({
        next:(res)=>{
          console.log(res);
          this.prevData = res.data[0];
          this.croppedImages.push(this.prevData.imageUrl as string)
          this.createForm();
        },
        error:(err)=>{
          this.toastService.showToast("Invalid Trip",ToastType.Failure)
        }
      })

      

    }
  }
  createForm(){
    console.log(this.prevData);
    
    
  
    // this.cd.detectChanges()
    this.tripEditForm.setValue({
      title: this.prevData.title,
      memberlimit: this.prevData.memberlimit,
      description: this.prevData.description
    });
  }

  ngAfterViewInit() {
    
    if (this.imageRef) {
      this.initCropper(this.imageRef.nativeElement);
    } else {
      console.error("Image element not found");
    }
  }
  getChangedData(formValue: any, originalData: any) {
    const changedData: any = {};
    for (const key in formValue) {
      if (formValue[key] !== originalData[key]) {
        changedData[key] = formValue[key];
      }
    }
    return changedData;
  }

  onSubmit() {
    console.log("hiohiohiohiohiohio");
    
    
    
    //{ title: '', members: '', description: '', start: '', end: '' }
    console.log(this.tripEditForm.value);  //{ title: '', members: '', description: '', start: '', end: '' }
    console.log(this.croppedImages);

   
    // Error Handling
    

    
    if(Number(this.tripEditForm.value.members)>30){
      this.toastService.showToast("Max 30 Members allowed",ToastType.Failure);
      return
    }
    if(Number(this.tripEditForm.value.members)<=1){
      this.toastService.showToast("Min 2 Members required",ToastType.Failure);
      return
    }
    if(!this.tripEditForm.value.title.trim() || !this.tripEditForm.value.description.trim()){
      this.toastService.showToast("Field is Empty",ToastType.Failure);
      return
    }

    const formdata = this.getChangedData(this.tripEditForm.value,this.prevData);
    console.log(formdata);
    if(Object.keys(formdata).length===0 && !this.croppedImages[0]){
      return
    }
 

    // Data Handling
    const tripData: ITripEditForm = {...formdata};
    if(this.croppedImages[0]){
      tripData.imageUrl = this.croppedImages[0]
    }
    

    this.isLoading = true
    console.log(tripData);

    this.tripService.updateTrip(this.tripid as string,tripData).subscribe({
      next:(res)=>{
        console.log(res);
        
        this.isLoading = false
        this.toastService.showToast("Trip Added",ToastType.Success);
        //    this.router.navigate(['posts'])
      },
      error:(err)=>{
        console.log(err);
        this.isLoading = false
        this.toastService.showToast("Something Wrong Happened",ToastType.Failure)
      }
    })
    
  
    
  }


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
      width: 1060, // Specify the width of the crop box
      height: 706 // Specify the height of the crop box
    };

    this.cropperInstance = new Cropper(image, {
      aspectRatio: 3 / 2, // Define aspect ratio here (e.g., 4:3)
      movable: true, // Allow user to move image within crop area
      zoomable: true, // Allow user to zoom in/out
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
    console.log("hehe");
    console.log(this.cropActive);
    this.cropActive = false;
    
    if (this.cropperInstance) {
      const canvas = this.cropperInstance.getCroppedCanvas({
        width: 1060,
        height: 706
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



  clearImage(){
    this.croppedImages.pop()
  }


}
