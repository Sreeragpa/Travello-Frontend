import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, tap, switchMap, of } from 'rxjs';
import { Feature } from '../../../core/models/mapService.models';
import { IPost } from '../../../core/models/post.models';
import { AuthService } from '../../../core/services/auth.service';
import { MapService } from '../../../core/services/map.service';
import { PostService } from '../../../core/services/post.service';
import { ToastService, ToastType } from '../../../core/services/toast.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImgUploadComponent } from "../img-upload/img-upload.component";
import Cropper from 'cropperjs';
import Datepicker from 'flowbite';
import { ITrip, ITripForm } from '../../../core/models/trip.model';
import { TripService } from '../../../core/services/trip.service';


interface TripFormdata{

}

@Component({
    selector: 'app-add-trip',
    standalone: true,
    templateUrl: './add-trip.component.html',
    styleUrl: './add-trip.component.css',
    imports: [FormsModule, ImgUploadComponent,ReactiveFormsModule]
})
export class AddTripComponent {
  

  @ViewChild('selectedimage',{static: true}) imageRef!: ElementRef<HTMLImageElement>
  cropperInstance: any;
  croppedImages: string[] = [];
  cropActive: boolean = false;
  suggestions: Feature[] = [];
  startingPoint:any;
  destination: any;
  caption: string = ""
  suggestionTarget!: string
  private searchvalue = new Subject<string>();
  isLoading: Boolean = false
  tripForm!: FormGroup

  constructor(
    private mapService: MapService, 
    private tripService: TripService,
    private authSerive: AuthService, 
    private toastService:ToastService, 
    private router: Router,
    private fb: FormBuilder
  ){
    this.tripForm = this.fb.group({
      title: new FormControl('',[]),
      members: new FormControl('',[]),
      description: new FormControl('',[]),
      start: new FormControl(''),
      end: new FormControl('')
    })

  }
  ngOnInit() {
    this.searchvalue.pipe(
      debounceTime(500), 
      distinctUntilChanged(), // Ignore same search terms
      tap(value=>console.log(value)),
      // switchMap((term: string) => this.mapService.autoComplete(term))
      switchMap((term: string) => term.trim() ? this.mapService.autoComplete(term) : of([]))
    ).subscribe((data:any) => {

      this.suggestions = data.features;

      
    })
  }

  ngAfterViewInit() {
    
    if (this.imageRef) {
      this.initCropper(this.imageRef.nativeElement);
    } else {
      console.error("Image element not found");
    }
  }

  onSubmit() {

   
    // Error Handling
    
    if(this.tripForm.value.start>=this.tripForm.value.end){
      this.toastService.showToast("Date Error",ToastType.Failure);
      return
    }
    
    if(Number(this.tripForm.value.members)>30){
      this.toastService.showToast("Max 30 Members allowed",ToastType.Failure);
      return
    }
    if(Number(this.tripForm.value.members)<=1){
      this.toastService.showToast("Min 2 Members required",ToastType.Failure);
      return
    }
    if(!this.tripForm.value.title.trim() || !this.tripForm.value.description.trim()){
      this.toastService.showToast("Field is Empty",ToastType.Failure);
      return
    }
    if(!this.startingPoint){
      this.toastService.showToast("Enter Starting Point",ToastType.Failure)
      return
    }
    if(!this.destination){
      this.toastService.showToast("Enter Destination",ToastType.Failure)
      return
    }

    // Data Handling
    const formValues:ITripForm = this.tripForm.value;
    const startingPoint = this.startingPoint; // assuming these are objects with name and coordinates
    const destination = this.destination;   

    const startingPointName = startingPoint.properties.formatted;
    const startingPointCoordinates = {
      latitude: startingPoint.geometry.coordinates[1],
      longitude: startingPoint.geometry.coordinates[0]
    };
  
    // Extract name and coordinates from destination
    const destinationName = destination.properties.formatted;
    const destinationCoordinates = {
      latitude: destination.geometry.coordinates[1],
      longitude: destination.geometry.coordinates[0]
    };

    const tripData: ITrip = {
      title: formValues.title,
      startingPoint: {
        name: startingPointName,
        coordinates: startingPointCoordinates
      },
      destination: {
        name: destinationName,
        coordinates: destinationCoordinates
      },
      startDate: new Date(formValues.start),
      endDate: new Date(formValues.end),
      description: formValues.description,
      imageUrl: this.croppedImages[0] // assuming you have a croppedImages array
      ,
      memberlimit: formValues.members
    };
    this.isLoading = true


    this.tripService.addTrip(tripData).subscribe({
      next:(res)=>{
        this.isLoading = false
        this.toastService.showToast("Trip Added",ToastType.Success);
        this.router.navigate([''])
 
        
      },
      error:(err)=>{

        this.isLoading = false
        this.toastService.showToast("Something Wrong Happened",ToastType.Failure)
      }
    })
    
  
    
  }


  onFile(imgFile: string){
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

    this.cropActive = false;
    
    if (this.cropperInstance) {
      // const canvas = this.cropperInstance.getCroppedCanvas();
      const canvas = this.cropperInstance.getCroppedCanvas({
        width: 1060,
        height: 706
    });
      if (canvas instanceof HTMLCanvasElement) {
        const dataUrl = canvas.toDataURL('image/jpeg');
        this.croppedImages.push(dataUrl)
      } else {
        console.error('getCroppedCanvas did not return a valid HTMLCanvasElement.');
      }
    } else {
      console.error('Cropper instance is null or undefined.');
    }

    this.cropperInstance.destroy();
  }

  onkeyLocationKeyUp(event: any){
    const query = event.target.value;
    this.suggestionTarget = event.target.name
    
    this.searchvalue.next(query)
    
  }

  selectStartingPoint(placeId: string){
    this.startingPoint = this.suggestions.find(value=>value.properties.place_id == placeId);
    this.suggestions=[]
     
  }
  selectDestination(placeId: string){

    this.destination = this.suggestions.find(value=>value.properties.place_id == placeId);

    this.suggestions=[]
     
  }


  clearImage(){
    this.croppedImages.pop()
  }





}
