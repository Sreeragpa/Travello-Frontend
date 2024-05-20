import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/passwordValidator';
import { ISignup } from '../../../core/models/auth.models';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})
export class SignupFormComponent {
  signupForm!: FormGroup;
  @Output() fromData: EventEmitter<ISignup> =  new EventEmitter()
  @Output() signupVerified: EventEmitter<boolean> = new EventEmitter()
  @Input() error!: string
  constructor(private fb: FormBuilder){
    this.signupForm = this.fb.group({
      username: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      confirmpassword: new FormControl('',[Validators.required,Validators.minLength(8),confirmPasswordValidator])  //Validators.pattern("[a-zA-Z ]*")
    })

  }

  onSubmit(){
    if(this.signupForm.valid){
      const data = this.signupForm.value
      this.fromData.emit(data)
    }else{
      this.signupForm.markAllAsTouched()
    }
    
    
  }
}


