import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textslice',
  standalone: true
})
export class TextslicePipe implements PipeTransform {

  transform(value: string, maxLength: number): string {
    if (!value) return '';
    return (value.length>maxLength)?value.substring(0,maxLength) + '...':value
  }

}
