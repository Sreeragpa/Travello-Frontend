import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SigninFormComponent } from "../../shared/widgets/signin-form/signin-form.component";
import { SignupFormComponent } from "../../shared/widgets/signup-form/signup-form.component";
import { OtpFormComponent } from "../../shared/widgets/otp-form/otp-form.component";
import { ISignup, Ilogin } from '../../core/models/auth.models';
import { AuthService } from '../../core/services/auth.service';
import { catchError, of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { animate, animation, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { ToastService, ToastType } from '../../core/services/toast.service';
import { MytoastComponent } from "../../shared/widgets/mytoast/mytoast.component";



@Component({
    selector: 'app-authpage',
    standalone: true,
    templateUrl: './authpage.component.html',
    styleUrl: './authpage.component.css',
    animations: [
        trigger('openClose', [
            // ...
            state('open', style({
                height: '200px',
                opacity: 1,
                backgroundColor: 'yellow'
            })),
            state('closed', style({
                height: '100px',
                opacity: 0.8,
                backgroundColor: 'blue'
            })),
            transition('open => closed', [
                animate('1s')
            ]),
            transition('closed => open', [
                animate('0.5s')
            ]),
        ]),
    ],
    imports: [RouterOutlet, SigninFormComponent, SignupFormComponent, OtpFormComponent, MytoastComponent]
})
export class AuthpageComponent {
  darkmode: boolean = false;
  isOtpSend: boolean = false;
  constructor(private router: Router, private authService: AuthService, private toastService: ToastService) {}
  background: string[] = ['/login', '/register'];
  isPresent: string = this.router.url;
  email: string = '';
  isLoading: boolean = false;
  signinerror: Boolean = false;
  signupError!: string
  otpError!: string
  test: any
  isOpen = true;
    toggle() {
    this.isOpen = !this.isOpen;
  }

  signin(data: Ilogin){
    this.isLoading = true
    console.log("hehehehhh");
    this.email = data.email
    console.log(data);
        this.authService.login(data)
        .pipe(
          catchError(error=>{
            this.test=error
            this.signinerror = true
            if(error.error.message == "INVALID_CREDENTIALS"){
              console.log("INVALID_CREDENTIALS");
            }
            if(error.error.message == "USER_NOT_VERIFIED"){
              this.toastService.showToast("OTP Sent Successfully",ToastType.Normal)
              this.isOtpSend = true
              this.otpError = ''
            }
            console.log(error);
            this.isLoading = false
            
            return of(null)
          })
        ).subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res) {
              console.log("Verified Successfully");
              this.router.navigate(['']);
            }
          },
          error: (error) => {
            console.error('Error navigating to signin:', error);
            // Handle error condition if necessary
          }
        })
    
  }

  signup(data: ISignup){
    this.isLoading = true
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
        this.isLoading = false
        return of(null)
      })
    )
    .subscribe(res => {
      if (res && res.status === 'success') {
        this.isLoading = false
        this.isOtpSend = true;
        this.toastService.showToast("OTP Sent Successfully",ToastType.Normal)
      }
    });
    
  }

  verifyOtp(otp: string){
    this.isLoading = true
    this.authService.verifyOtp({email:this.email,otp:otp}).pipe(
      catchError((error)=>{
        this.otpError = error.error.message
        console.log(error);
      this.isLoading = false
        
        return of(null)
      })
    ).subscribe((res)=>{
      this.isLoading = false
      if(res){
        this.toastService.showToast("OTP Verified Successfully",ToastType.Normal)

        setTimeout(()=>{
          this.signinerror = false
          this.isOtpSend = false
        },2000)
        console.log("Otp Verified Successfully");
        this.router.navigate(['/signin'])  
      }
    })
  }
}
