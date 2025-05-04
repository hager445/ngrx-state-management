import { Injectable } from '@angular/core';
import { Iuser } from '../../../shared/interfaces/iusers/iusers';
import { ModalService } from '../modal/modal.service';



@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  userToken!:string|null;
  constructor(private _ModalService :ModalService) {}

  saveUser(user:Iuser){
    localStorage.setItem('userToken',JSON.stringify(user))!;
  }
getToken(): string | null{
  const tokenObj = localStorage.getItem('userToken');
  if (!tokenObj) return null;
  this._ModalService.activateModalAfterRegister.set(true);
 return JSON.parse(tokenObj).token;
}
 logOut(){
  localStorage.removeItem('userToken');
  this._ModalService.activateModalAfterRegister.set(false);


 }
}
