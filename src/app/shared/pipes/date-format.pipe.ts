import { Pipe, PipeTransform } from '@angular/core';
import {format, formatDistanceToNow, isToday, isYesterday} from "date-fns"

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | string,dateFormat: string = 'yyyy-MM-dd HH:mm a'): string {
    const date = new Date(value);

    if (isToday(date)) {
      return formatDistanceToNow(date, { addSuffix: true }); // 'just now', '5 minutes ago', etc.
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'yyyy-MM-dd hh:mm:ss a'); // Default format
    }
  }
  

}
