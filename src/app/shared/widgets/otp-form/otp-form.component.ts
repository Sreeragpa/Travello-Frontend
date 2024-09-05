import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './otp-form.component.html',
  styleUrl: './otp-form.component.css'
})
export class OtpFormComponent {
clearInput(idx: number) {
  this.otpInputs.toArray()[idx].nativeElement.value=''
}
  @Input({required:true}) formtype!: string
  @Input({required:true}) email!: string
  @Input() error!: string
  @Output() formData: EventEmitter<string> = new EventEmitter()
  @Input() isLoading: boolean = false

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

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

  ngAfterViewInit(): void {
    this.otpInputs.toArray()[0].nativeElement.focus();
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
    
    if(this.otpForm.valid){
      
      const otp = this.otpForm.value.otp.join('');
      this.formData.emit(otp)
      
    }else{
      this.otpForm.markAllAsTouched()
    }
    
  }

  checkOTPFormValid(event: KeyboardEvent, idx: number){
    const keyChar: string = event.key;

    if (/[0-9A-Za-z]/.test(keyChar) && !event.shiftKey ) {
        if (idx < 5) {
          // if(this.otpInputs.toArray()[idx].nativeElement.value && keyChar!="Shift"){
          //   this.otpInputs.toArray()[idx].nativeElement.value = keyChar;
          // }
          this.otpInputs.toArray()[idx + 1].nativeElement.focus();
        }
    } else if (keyChar === 'Backspace') {
      if (idx > 0) {
        this.otpInputs.toArray()[idx - 1].nativeElement.focus();
      }
    }
    
    
    if(this.otpForm.valid){
      this.otpFormValid = true
    }else{
      this.otpFormValid = false
    }
  }
  createOtpControls() {
    // Create exactly 6 FormControl instances
    for (let i = 0; i < 6; i++) { 
      this.otpControls.push(new FormControl('', [Validators.required])); 
    }
  }
}
