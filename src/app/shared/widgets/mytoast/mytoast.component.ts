import { Component, Input } from '@angular/core';
import { ToastService, ToastType } from '../../../core/services/toast.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-mytoast',
  standalone: true,
  imports: [],
  templateUrl: './mytoast.component.html',
  styleUrl: './mytoast.component.css'
})
export class MytoastComponent {
  type!: ToastType | null
  message!: string | null
  constructor(private toastService: ToastService){}
  ngOnInit() {
    this.toastService.getToaster.subscribe(data=>{
      this.message = data.message;
      this.type = data.type
      setTimeout(()=>{
        this.message = null;
        this.type = null
      },3000)
    })
  }
  
  // ngOnInit() {
  //   this.toastService.getToaster.pipe(
  //     switchMap(data=>{
  //       return of(data)
  //     })
  //   ).subscribe(data=>{
  //     this.message = data.message;
  //     this.type = data.type;
  //         setInterval(()=>{
  //       this.message = null;
  //       this.type = null
  //     },3000)
  //   })
  // }
  
}
