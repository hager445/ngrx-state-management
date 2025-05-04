import { Directive, effect, ElementRef, Renderer2 } from '@angular/core';
import { ModalService } from '../../../core/services/modal/modal.service';

@Directive({
  selector: '[appFormModal]',
  standalone: true
})
export class FormModalDirective {
  
  constructor(private _Renderer:Renderer2, private _ModalService:ModalService,private el: ElementRef) {
    effect(()=>{
      this.handleModal();

    })

   }
handleModal(){
  if (this._ModalService.modalIsActive()=== true) {
    
    this._Renderer.removeClass(this.el.nativeElement, 'hidden');
    this._Renderer.addClass(this.el.nativeElement, 'block');
  }else{

    this._Renderer.removeClass(this.el.nativeElement, 'block');
    this._Renderer.addClass(this.el.nativeElement, 'hidden');
  }
}

}
