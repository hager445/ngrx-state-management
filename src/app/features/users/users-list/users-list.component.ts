import { Component, ElementRef, inject, ViewChild } from '@angular/core';

import {  CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { debounceTime,fromEvent, map, Observable, Subscription } from 'rxjs';

import { Router } from '@angular/router';
import { UsersFormComponent } from '../users-form/users-form.component';
import {  Store } from '@ngrx/store';


import { User } from '../../../store/users.state';

import { AppState } from '../../../store/users.reducer';

import { deleteUser, loadUsers } from '../../../store/users.actions';
import {  selectUsers } from '../../../store/users.selectors';
import { Iuser } from '../../../shared/interfaces/iusers/iusers';
import { ModalService } from '../../../core/services/modal/modal.service';
import { UpdatemodeService } from '../../../core/services/updatemode/updatemode.service';

@Component({
  selector: 'app-users-list',
  imports: [CdkVirtualScrollViewport , ScrollingModule,FormsModule,UsersFormComponent],
  templateUrl: './users-list.component.html',
  standalone:true,
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  
  // handle filter: 
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  
  searchValue:string='';
  // =========== handle Update Inputs:
  setUpdateMode:boolean = false;
  userInfo:Iuser={}as Iuser;
  //================================
  filterValue:string='Filter By';
  users:User[]=[];
  users$!:Observable<User[]> ;
  filteredUsers:User[]=[];
  searchSubscription!:Subscription;
  private readonly _Router = inject(Router);
  constructor(private store:Store<AppState> , public _UpdateModeService:UpdatemodeService, private _Modal:ModalService){
    this.users$ = this.store.select(selectUsers);
  }
ngAfterViewInit(): void {
  this.store.dispatch(loadUsers())
  this.showUpUsers()
  }
  
  // load users & filter:
 showUpUsers(){
    this.users$.subscribe
    (res=>{

      this.users = res;
      this.filteredUsers = this.users;
      
      
    })
   

}
onSearchChange(){
  this.searchSubscription = fromEvent(this.searchInput.nativeElement,'input').pipe(
    debounceTime(300),
    map((event:Event)=>{
    const target = event.target as HTMLInputElement;
    return target.value;
  }),

).subscribe((value)=>{
  this.searchValue=value;
  this.onFilterBy();
}
)


}
onFilterBy(){
  const roleFilter = this.filterValue.toLowerCase();
  const searchFilter = this.searchValue.toLowerCase();
  this.filteredUsers = this.users
    .filter(user => roleFilter === 'filter by' || user.role.toLowerCase() === roleFilter)
    .filter(user => user.name.toLowerCase().includes(searchFilter));
}
// ==================================
// delete user:
deleteUser(id:string){
  this.store.dispatch(deleteUser({id:id}))
}

// =================
setUpdateModeFunc(user:Iuser){

  this._UpdateModeService.handleUpdateModeValue(true);
  this._UpdateModeService.changeUserInfo(user);
  this.openModal()
  
}
// ===============
handleAddMode(){
  this._UpdateModeService.setAddMode();
  this.openModal()
}
// =handle modal:
openModal(){
  this._Modal.openModal()
}
closeModal(){
  this._Modal.closeModal()
}
// =================routing 
redirctToCreateUser(){
  this._Router.navigate(['/users/create'])
}
//  ===================
ngOnDestroy(): void {
  if (this.searchSubscription) {
    
    this.searchSubscription.unsubscribe();
  }
}
}
