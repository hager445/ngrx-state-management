import { Injectable, signal } from '@angular/core';
import { Iuser } from '../../../shared/interfaces/iusers/iusers';

@Injectable({
  providedIn: 'root'
})
export class UpdatemodeService {
userInfo = signal<Iuser>({} as Iuser);
setUpdateMode = signal<boolean>(false);
  constructor() {}
  changeUserInfo(user:Iuser){
    this.userInfo.set(user);
  }
  handleUpdateModeValue(value:boolean){
    this.setUpdateMode.set(value);
  }
  setAddMode(){
    this.userInfo.set({}as Iuser);
    this.setUpdateMode.set(false);
  }
}
