import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: Date,timeFormat: string = 'h:mm a'): string {
    if (!value) return '';
     return format(value, timeFormat);;
  }

}
