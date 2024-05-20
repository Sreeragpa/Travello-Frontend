import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SigninFormComponent } from "../../shared/widgets/signin-form/signin-form.component";
import { SignupFormComponent } from "../../shared/widgets/signup-form/signup-form.component";
import { OtpFormComponent } from "../../shared/widgets/otp-form/otp-form.component";
import { ISignup, Ilogin } from '../../core/models/auth.models';
import { AuthService } from '../../core/services/auth.service';
import { catchError, of } from 'rxjs';

@Component({
    selector: 'app-authpage',
    standalone: true,
    templateUrl: './authpage.component.html',
    styleUrl: './authpage.component.css',
    imports: [RouterOutlet, SigninFormComponent, SignupFormComponent, OtpFormComponent]
})
export class AuthpageComponent {
  darkmode: boolean = false;
  isOtpSend: boolean = false;
  constructor(private router: Router, private authService: AuthService) {}
  background: string[] = ['/login', '/register'];
  isPresent: string = this.router.url;
  email: string = '';
  isLoading: Boolean = false;
  signinerror: Boolean = false;
  signupError!: string
  otpError!: string

  signin(data: Ilogin){
    this.isLoading = true
    console.log("hehehehhh");
    this.email = data.email
    console.log(data);
        this.authService.login(data)
        .pipe(
          catchError(error=>{
            this.signinerror = true
            if(error.error.message == "INVALID_CREDENTIALS"){
              console.log("INVALID_CREDENTIALS");
            }
            if(error.error.message == "USER_NOT_VERIFIED"){
              this.isOtpSend = true
            }
            console.log(error);
            
            return of(null)
          })
        ).subscribe((res)=>{
          if(res){
            this.router.navigate(['']);
          }
          console.log(res);
        })
    
  }

  signup(data: ISignup){
    console.log(data);
    this.email = data.email
    this.authService.signup(data)
    .pipe(
      catchError(error => {
        if(error.error.message == "EMAIL_ALREADY_EXISTS"){
          console.log("Email Already Exists");
          this.signupError = "Account already exists"
        }
        console.log('Error during signup:', error);
        return of(null)
      })
    )
    .subscribe(res => {
      if (res.status === 'success') {
        this.isOtpSend = true;
      }
    });
    
  }

  verifyOtp(otp: string){

    this.authService.verifyOtp({email:this.email,otp:otp}).pipe(
      catchError((error)=>{
        this.otpError = error.error.message
        console.log(error);
        
        return of(null)
      })
    ).subscribe((res)=>{
      if(res){
        console.log("Verified Successfully");
        this.router.navigate(['/signin'])
        
      }
    })
  }
}
