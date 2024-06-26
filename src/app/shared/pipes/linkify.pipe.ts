import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkify',
  standalone: true
})
export class LinkifyPipe implements PipeTransform {

  transform(value: string): string {  
    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return value.replace(urlRegex, (url) => `<a class="text-blue-600 cursor-pointer" href="${url}" target="_blank">${url}</a>`);
  }

}
