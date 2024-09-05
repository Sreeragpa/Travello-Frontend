import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Ilogin } from '../../../core/models/auth.models';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,GoogleSigninButtonModule],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.css'
})
export class SigninFormComponent {
  @Output() formdata: EventEmitter<Ilogin> = new EventEmitter();
  @Input() error: Boolean = false;
  @Input() isLoading: boolean = false
  @Output() onForgotPassword: EventEmitter<boolean> = new EventEmitter();
  signinForm!: FormGroup
  constructor(private fb: FormBuilder, private authService: AuthService,private googleAuthService:SocialAuthService,private router: Router){
    this.signinForm = this.fb.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    })  
  }

  ngOnInit() {
    this.googleAuthService.authState.subscribe((user) => {
      this.authService.loginWithGoogle(user.idToken).subscribe({
        next:(res)=>{
          this.router.navigate([''])
        },
        error:(err)=>{
          console.log(err,'errr');
        }
      })
      
    });
  }


  onSubmit(){
    if(this.signinForm.valid){
      const logindata:Ilogin = this.signinForm.value
      this.formdata.emit(logindata)
    }else{
      this.signinForm.markAllAsTouched()
    }
    
  }

  forgotPassword(){
    this.onForgotPassword.emit(true)
  }
}
