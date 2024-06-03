import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Ilogin } from '../../../core/models/auth.models';

@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.css'
})
export class SigninFormComponent {
  @Output() formdata: EventEmitter<Ilogin> = new EventEmitter();
  @Input() error: Boolean = false
  signinForm!: FormGroup
  constructor(private fb: FormBuilder, private authService: AuthService){
    this.signinForm = this.fb.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    })  
  }
  
  onSubmit(){

    if(this.signinForm.valid){
      const logindata:Ilogin = this.signinForm.value
      this.formdata.emit(logindata)
    }else{
      this.signinForm.markAllAsTouched()
    }
    
  }
}
