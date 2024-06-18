import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notSeenNotifCount'
})
export class NotSeenNotifCountPipe implements PipeTransform {

  transform(value: any[]): number {
    return value.filter(notif => notif.seenTime === null).length;
  }

}
