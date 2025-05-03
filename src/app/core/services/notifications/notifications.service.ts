import { Injectable, NgZone } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inotify, notifyType } from '../../../shared/interfaces/inotify/inotify';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private start : boolean = false ;
private notificationInterval = interval(2000);
  public notifySubject = new Subject<Inotify>();
  public notify$ = this.notifySubject.asObservable();
  typeRandom : {message:string,type:number}[] = [{
    message:`Great! 
    this user is successifully logined`,
    type:0
     }
   ,
   {
     message:`Warning!this user has logined warning`,
     type:1
      }
      ,
      {
       message:`Error! obs this user has logined Errors`,
       type:2
        }
   ]
  constructor(private ngZone: NgZone) {}
  getRandomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  startNotifications() {
    if (this.start) return;
    this.start = true ;
    this.ngZone.runOutsideAngular(() => {
      this.notificationInterval.pipe(
      
        map(() => {
          const randomNum = this.getRandomBetween(0,2);
          const notification: Inotify = {
            id:Date.now(),
            message: this.typeRandom[randomNum].message,
            type: this.typeRandom[randomNum].type,
            duration: 3000,
            selected:false
          };
          return notification;
        })
      ).subscribe(res => {
     
        this.ngZone.run(() => {
          this.notifySubject.next(res);
        });
      });
    });
  }

}

