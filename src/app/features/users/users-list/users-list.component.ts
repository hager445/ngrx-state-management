import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { UsersService } from '../../../core/services/users/users.service';

import {  CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, fromEvent, map, Observable, Subscription } from 'rxjs';

import { Router } from '@angular/router';
import { UsersFormComponent } from '../users-form/users-form.component';
import { Store } from '@ngrx/store';


import { User } from '../../../store/users.state';

import { AsyncPipe } from '@angular/common';
import { AppState } from '../../../store/users.reducer';

import { loadUsers } from '../../../store/users.actions';
import { selectUserFeature, selectUsers } from '../../../store/users.selectors';

@Component({
  selector: 'app-users-list',
  imports: [CdkVirtualScrollViewport , ScrollingModule,FormsModule,UsersFormComponent,AsyncPipe],
  templateUrl: './users-list.component.html',
  standalone:true,
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  
  // handle filter: 
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  searchValue:string='';
  filterValue:string='Filter By';
  users:User[]=[];
  users$!:Observable<User[]> ;
  filteredUsers:User[]=[];
  searchSubscription!:Subscription;
  private readonly _Router = inject(Router);
  private readonly _UserService = inject(UsersService);
  constructor(private store:Store<AppState>){
    this.users$ = this.store.select(selectUsers);
  }
  ngAfterViewInit(): void {
    this.store.dispatch(loadUsers())
    console.log(this.users$);
    setTimeout(()=>{

      this.showUpUsers()
    },1000)
  }
  
  
  showUpUsers(){
    this.users$.subscribe
    (rezs=>{

      console.log(rezs);
      
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
ngOnDestroy(): void {
  if (this.searchSubscription) {
    
    this.searchSubscription.unsubscribe();
  }
}

// =================routing 
redirctToCreateUser(){
this._Router.navigate(['/users/create'])
}
}
