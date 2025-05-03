import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { StorageService } from '../../core/services/storage/storage.service';
import { Iuser } from '../../shared/interfaces/iusers/iusers';

@Component({
  selector: 'app-main-layout',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  user!:Iuser;
constructor(private _storageService:StorageService,private _Router:Router){

}
ngOnInit(): void {
  this.getUserFromLocalstorage()
}
handleLogout(){
  this._storageService.logOut();
  this._Router.navigate(['/login'])
}
getUserFromLocalstorage(){
  const userObj = localStorage.getItem('userToken');
  if (userObj) {
    this.user = JSON.parse(userObj);
  }
}
}
