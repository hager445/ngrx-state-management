import { Injectable } from '@angular/core';
declare var flowbite:any;
@Injectable({
  providedIn: 'root'
})
export class ModalService {

 private  modalsMap = new Map<string,any>()
  constructor() {}
  createMap(id:string, modal:HTMLElement){
    if (!this.modalsMap.has(id)) {
      // create instance:
      const modalInstance = new flowbite.Modal(modal);
      this.modalsMap.set(id,modalInstance);
    }
  }
  openModal(id:string){
  const modalElement = this.modalsMap.get(id);
  if(!modalElement)return;
  if (typeof flowbite !== 'undefined') {
    // const modalInstance = new flowbite.Modal(modalElement);
    modalElement.show();
  }else {
    console.error("Flowbite is not loaded.");
  }
}
closeModal(id:string){
  const modalElement = this.modalsMap.get(id);
  if(!modalElement)return;
    if (typeof flowbite !== 'undefined') {
      
      // const modalInstance = new flowbite.Modal(modalElement);
      modalElement.hide();
    }else {
      console.error("Flowbite is not loaded.");
    }
  }
}
