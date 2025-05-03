import { ChangeDetectionStrategy, Component, effect, signal, ViewChild } from '@angular/core';
import { NotificationsService } from '../../../core/services/notifications/notifications.service';
import { Inotify } from '../../../shared/interfaces/inotify/inotify';
import { noop, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OutsideclickdirectiveDirective } from '../../../shared/directives/outsideclickdirective/outsideclickdirective.directive';
import { log } from 'node:console';

@Component({
  selector: 'app-toast-container',
  imports: [CommonModule,OutsideclickdirectiveDirective],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ToastContainerComponent {
  select=signal<boolean>(false);

  notifications=signal<Inotify[]>([]);
  timer:any = null;
  private subscription! : Subscription;
  constructor(private _NotificationsService:NotificationsService){
    
    this._NotificationsService.startNotifications();
    this.startNotifi()
    
    effect(() => {
    
        if (this.notifications().length > 5 && !this.timer && this.select() === false) {
          this.autoDelete(this.notifications()[0].duration)
        }else if(this.select() === true && this.timer)
      {
       this.stopInterval()
      }
      });
  }
  startNotifi(){
    this.subscription =  this._NotificationsService.notify$.subscribe((noty:Inotify)=>{
      this.notifications.update((notifications)=>[...notifications, noty]);
      
    })
  }
  // ================ handle selection state :
  chageSelectionState(){
   
    
    this.select.update(value=> !value);
  }
  onCheckboxChange(event:Event,notifi:Inotify){
    const target = event.target as HTMLInputElement ;
    this.notifications.update((prev) =>
      prev.map((n) =>
        n.id === notifi.id? { ...n, selected: target.checked } : n
      )
    )
    console.log(this.notifications());
    
  }
  deleteSelected(){

   this.stopInterval()
   
  this.notifications.update((prev)=> prev.filter((n)=> {
   
   return !n.selected}))

   this.select.set(false);
  
  }
  // ===================================

autoDelete(duration:number){

  this.timer = setInterval(()=>{
   
   if (this.notifications().length >0) {
    this.notifications.update((notifications) => notifications.slice(1));
  }else{
this.stopInterval()
    }
  },duration);
}
ngOnDestroy(): void {

this.subscription.unsubscribe();
this.stopInterval();
}
stopInterval(){
  clearInterval(this.timer);
      this.timer=null;
}
// ============= delete with button and directive
deleteNotifi(index:number){
this.notifications.update((prev) => prev.filter((_, i) => i !== index));
}
clearAll(){
  this.notifications.set([]);
}


}
