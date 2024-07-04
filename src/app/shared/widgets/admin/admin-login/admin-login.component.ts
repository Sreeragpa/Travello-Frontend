import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../../core/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  loginForm!: FormGroup
  error: boolean = false;

  constructor(private fb:FormBuilder,private adminService: AdminService, private router: Router){}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

onSubmit() {
  const loginData = this.loginForm.value;
  if(this.loginForm.valid){
    this.adminService.login(loginData).subscribe({
      next:(res)=>{
        this.router.navigate(['/admin/dashboard'])
      },
      error:(err)=>{
        this.error = true;
      }
    })
  }

}

}
