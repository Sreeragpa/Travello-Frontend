import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './otp-form.component.html',
  styleUrl: './otp-form.component.css'
})
export class OtpFormComponent {
  @Input({required:true}) formtype!: string
  @Input({required:true}) email!: string
  @Input() error!: string
  @Output() formData: EventEmitter<string> = new EventEmitter()
  otpForm!: FormGroup
  otpControls: FormControl[] = [];
  otpInput: any;
  otpFormValid:boolean = false
  otpTimer: number = 60
  private intervalId: any;


  constructor(private fb: FormBuilder){
    this.createOtpControls()
    this.otpForm = this.fb.group({
      otp: this.fb.array(this.otpControls)
    })  
  }
  ngOnInit() {
    this.startOtpTimer();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startOtpTimer() {
    this.intervalId = setInterval(() => {
      if (this.otpTimer === 0) {
        clearInterval(this.intervalId);
      } else {
        this.otpTimer--;
      }
    }, 1000);
  }

  onSubmit(){ 
    console.log('hehe');
    
    if(this.otpForm.valid){
      
      const otp = this.otpForm.value.otp.join('');
      console.log(otp);
      this.formData.emit(otp)
      
    }else{
      console.log('EROR');
      
      this.otpForm.markAllAsTouched()
    }
    
  }

  checkOTPFormValid(){
    if(this.otpForm.valid){
      this.otpFormValid = true
    }else{
      this.otpFormValid = false
    }
  }
  createOtpControls() {
    // Create exactly 6 FormControl instances
    for (let i = 0; i < 6; i++) { // Ensure loop runs exactly 6 times
      this.otpControls.push(new FormControl('', [Validators.required])); 
    }
  }
}
