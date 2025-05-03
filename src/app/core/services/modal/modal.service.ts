import { Injectable, signal } from '@angular/core';
declare var flowbite: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {
 modalIsActive= signal<boolean>(false)
  
  constructor() {}
  


  openModal() {
   this.modalIsActive.set(true);
   
  }
  closeModal() {
    this.modalIsActive.set(false);
  
  }
}
