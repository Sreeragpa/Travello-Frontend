import { Component, EventEmitter, Input, Output } from '@angular/core';
import IUser from '../../../core/models/user.models';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService, ToastType } from '../../../core/services/toast.service';

interface editProfile{
  name: string,
  username: string,
  bio: string
}
interface editPassword{
  currentpassword: string,
  newpassword: string
}

@Component({
  selector: 'app-editprofile-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editprofile-form.component.html',
  styleUrl: './editprofile-form.component.css'
})
export class EditprofileFormComponent {
  @Input() user!:IUser
  @Input() formtype:string = 'default';
  @Output() changeProfile: EventEmitter<any> = new EventEmitter()
  @Output() changePassword: EventEmitter<any> = new EventEmitter()
  toggleStatus: boolean = true;
  myAnimations: boolean = false
  editForm!: FormGroup
  passwordForm!: FormGroup

  constructor(private fb: FormBuilder,private toastService: ToastService){
  
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      profiledetails: this.fb.group({
        name: new FormControl(this.user.name,Validators.required),
        username: new FormControl(this.user.username,Validators.required),
        bio: new FormControl(this.user.bio,[Validators.required,Validators.maxLength(50)])
      }),

      changepassword:this.fb.group({
       currentPassword: new FormControl('',Validators.required),
       newPassword: new FormControl('', [Validators.required,Validators.minLength(8)])
      })
     })
  }

  togglePassword(){
    this.toggleStatus = false;
    setTimeout(()=>{
      this.myAnimations = true
    },100)

  }

  onSubmit(){
    if(this.toggleStatus){

      console.log(this.editForm.get('profiledetails')?.valid);
      console.log(this.editForm.get('profiledetails')?.value);

      console.log();
      

      if(this.editForm.get('profiledetails')?.valid){
        let data = this.editForm.get('profiledetails')?.value
        this.changeProfile.emit(data)
      }

      
    }else{
      console.log(this.editForm.get('changepassword')?.valid);
      console.log(this.editForm.get('changepassword')?.value);

      if(this.editForm.get('changepassword')?.valid){
        let data = this.editForm.get('changepassword')?.value
        this.changePassword.emit(data)
      }else{
        this.toastService.showToast("Invalid Field",ToastType.Failure)
      }

      
    }
    
  }


}
