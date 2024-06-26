import { Pipe, PipeTransform } from '@angular/core';
import {differenceInMonths, format, formatDistanceToNow, isToday, isYesterday} from "date-fns"

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | string, dateFormat: string = 'yyyy-MM-dd HH:mm a'): string {
    const date = new Date(value);

    // Handle today's date
    if (isToday(date)) {
      return formatDistanceToNow(date, { addSuffix: true }); 
    } 
    // Handle yesterday's date
    else if (isYesterday(date)) {
      return 'Yesterday';
    } 
    // Handle dates within the last 6 months
    else if (differenceInMonths(new Date(), date) < 6) {
      return formatDistanceToNow(date, { addSuffix: true });
    } 
    // Handle dates older than 6 months
    else {
      return format(date, 'd MMM yyyy'); 
    }
  }
  

}
