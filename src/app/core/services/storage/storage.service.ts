import { Injectable } from '@angular/core';
import { Iuser } from '../../../shared/interfaces/iusers/iusers';



@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  userToken!:string|null;
  constructor() {}

  saveUser(user:Iuser){
    localStorage.setItem('userToken',JSON.stringify(user))!;
  }
getToken(): string | null{
  const tokenObj = localStorage.getItem('userToken');
  if (!tokenObj) return null;
 return JSON.parse(tokenObj).token;
}
 logOut(){
  localStorage.removeItem('userToken');

 }
}
