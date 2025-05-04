import { Injectable, NgZone } from '@angular/core';
import { interval, map, Observable, of, shareReplay, Subject } from 'rxjs';
import { Ichart } from '../../../shared/interfaces/ichart/ichart';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private  obsInterval:Observable<any> = interval(5000);
  public  subject = new Subject<Ichart[]>();
  private initialized = false;


  constructor(private ngZone:NgZone) { }

createWebsocket(){
  
  if (this.initialized) return;
  this.initialized = true;
  const pages = ['home', 'users', 'notifications'];

 this.ngZone.runOutsideAngular(()=>{
  this.obsInterval.pipe(
    map(()=>{
    
    return  pages.map((name)=>{
        return {
          name,
          value: Math.floor((Math.random() * 100) )+ 1
        }
        }
    )}
   )).subscribe(
     
 
     visits=>{
      
      
      this.ngZone.run(()=>{
        this.subject.next(visits)
      }
      )
    }
   
   
 )
})}
storeLastValue():Observable<any>{

 return this.subject.pipe(
  shareReplay({ bufferSize: 1, refCount: true, windowTime: 120000 })

  )
}
}
