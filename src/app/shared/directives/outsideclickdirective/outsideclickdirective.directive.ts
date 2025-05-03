import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Signal, signal } from '@angular/core';
import { Inotify } from '../../interfaces/inotify/inotify';

@Directive({
  selector: '[appOutsideclickdirective]'
})
export class OutsideclickdirectiveDirective {

@Output() clickOutside = new EventEmitter<MouseEvent>();
  constructor(private _ElementRef:ElementRef) { }
  @HostListener('document:click', ['$event.target'])
  onDocumentClick(targetElement:HTMLElement){

if(!this._ElementRef.nativeElement.contains(targetElement)) {
  this.clickOutside.emit();
};


  }
  
}
