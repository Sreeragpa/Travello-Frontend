import { Component, ElementRef, ViewChild } from '@angular/core';
import { EditprofileFormComponent } from "../../shared/widgets/editprofile-form/editprofile-form.component";
import { RouterLink } from '@angular/router';
import Cropper from 'cropperjs';
import { UserService } from '../../core/services/user.service';
import IUser from '../../core/models/user.models';
import { ToastService, ToastType } from '../../core/services/toast.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css',
  imports: [EditprofileFormComponent, RouterLink, AsyncPipe]
})
export class EditprofileComponent {
  toggleStatus: boolean = true;
  cropperInstance: any;
  user!: IUser

  @ViewChild('selectedimage', { static: true }) imageRef!: ElementRef<HTMLImageElement>
  @ViewChild('toggleButton', { static: true }) toggleButton!: ElementRef<HTMLButtonElement>
  @ViewChild('popupModal') popupModal!: ElementRef;

  constructor(private userService: UserService, private toastService: ToastService) {

  }
  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (res) => {
        if (res) {
          console.log(res);

          this.user = res.data
        }
      },
      error: (err) => {
        this.toastService.showToast("Something Bad happened", ToastType.Failure)

      }
    })
  }
  togglePassword() {
    this.toggleStatus = !this.toggleStatus
  }

  onFile(event: any) {
    console.log('change dete');

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      const image = this.imageRef.nativeElement;
      image.src = reader.result as string;
      console.log('HII');

      // this.toggleButton.nativeElement.click()
      this.popupModal.nativeElement.classList.remove('hidden');
      this.popupModal.nativeElement.classList.add('flex');
      this.initCropper(image);
    };

  }
  initCropper(image: HTMLImageElement) {
    if (this.cropperInstance) {
      this.cropperInstance.destroy(); // Destroy existing cropper instance
    }
    const cropBoxOptions = {
      width: 300, // Specify the width of the crop box
      height: 300 // Specify the height of the crop box
    };

    this.cropperInstance = new Cropper(image, {
      aspectRatio: 1, // Aspect ratio 1:1 for a square
      movable: true, // Allow user to move image within crop area
      zoomable: true, // Allow user to zoom in/out
      viewMode: 1, // Enable drag mode for repositioning image
      cropBoxResizable: true,
      cropBoxMovable: true,
      center: true,
      guides: true,
      dragMode: 'none', // Enable dragging the image within the crop box
      // Other options as needed
    });

  }

  onuploadProfile() {
    // const canvas = this.cropperInstance.getCroppedCanvas();
    const canvas = this.cropperInstance.getCroppedCanvas({
      width: 1024,
      height: 1024
  });
    const dataUrl = canvas.toDataURL('image/jpeg');
    console.log(dataUrl);
    this.toastService.showToast("Uploading",ToastType.Normal)
    this.userService.updateProfileimg(dataUrl).subscribe({
      next: (res) => {
        this.user = res.data
        
        this.toastService.showToast("Profile Picture Updated", ToastType.Success)
        this.popupModal.nativeElement.classList.remove('flex');
        this.popupModal.nativeElement.classList.add('hidden');
      },
      error: (err) => {
        this.toastService.showToast("Something Bad happened", ToastType.Failure)
      }
    })

  }

  onChangeProfile(data: any) {
    console.log(data);
    const formdata = this.getChangedData(data, this.user);
    if (!Object.keys(formdata).length) return
    console.log(Object.keys(formdata));
    this.userService.updateProfile(formdata).subscribe({
      next: (res) => {
        console.log(res );
        this.user = res.data
        this.toastService.showToast("Updated Successfully", ToastType.Success)
      },
      error: (err) => {
        console.log(err);
        this.toastService.showToast("Something Wrong Happened", ToastType.Failure)
      }
    })


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
  onChangePassword(data: { currentPassword: string, newPassword: string }) {
    console.log(data);
    this.userService.updatePassword(data.currentPassword, data.newPassword).subscribe({
      next: (res) => {
        this.toastService.showToast(res.data, ToastType.Success)

      },
      error: (error) => {
        this.toastService.showToast(error.error.message, ToastType.Failure)
      }
    })

  }

}
