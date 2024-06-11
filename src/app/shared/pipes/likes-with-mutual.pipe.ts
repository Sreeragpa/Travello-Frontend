import { Pipe, PipeTransform } from '@angular/core';
import { ILikedUser } from '../../core/models/user.models';

@Pipe({
  name: 'likesWithMutual',
  standalone: true
})
export class LikesWithMutualPipe implements PipeTransform {

  transform(value: ILikedUser[] | undefined): string {
    value = value as ILikedUser[]
    let count = value.length;
    let mutuals: string[] = []
    let k = 0;

    
    if(value){
      value.forEach((user)=>{
        if(user.isMutualFollow == true && k<2){
          k++;
          mutuals.push(user.username)
          count--;
        }
      })

    }
   
    if(mutuals.length){
      return mutuals.join(",") +" & "+count + "others";
    }
    return ""
 
    
  }

}
