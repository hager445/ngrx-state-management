
import { Injectable } from "@angular/core";
import { loadUsers, loadUsersSuccess,addUser, addUserSuccess, deleteUser, deleteUserSuccess, updateUser, updateUserSuccess } from "./users.actions";
import { createEffect,Actions, ofType } from "@ngrx/effects";
import {  map, Observable, switchMap, tap } from 'rxjs';
import { UsersService } from '../core/services/users/users.service';
import { UsersActionsComponent } from "../features/users/users-actions/users-actions.component";
import { Iuser } from "../shared/interfaces/iusers/iusers";

@Injectable()
export class loadUsersEffect{
  loadUsers$:Observable<any>;
  addUsers$:Observable<any>;
  updateUsers$:Observable<any>;
  deleteUsers$:Observable<any>;
    constructor(private actions$:Actions, private _userService:UsersService){
      // load user:
      this.loadUsers$ = createEffect(() =>
        this.actions$.pipe(
          ofType(loadUsers),    // أول ما يحصل loadUsers action
          switchMap(() =>
            this._userService.getUsers().pipe(
              map(users => loadUsersSuccess({ users })), // لو نجح
      
            )
          )
        )
      );
      // =================================== add user:
      this.addUsers$ = createEffect(()=>{
        return this.actions$.pipe(
          ofType(addUser),
          switchMap((action)=>{
         return   this._userService.createUser(action.user).pipe(
              map((user)=> addUserSuccess({user})
              )
            )
          })

        )
      })
      // =================================== update user:
this.updateUsers$ = createEffect(()=>{
  return this.actions$.pipe(
    ofType(updateUser),
    switchMap((action)=>{
      console.log('from effect' , action.id,action.user);
      
        return this._userService.updateUser(action.user,action.id).pipe(
          map((updatedUser)=> {
            console.log('from map',updateUser);
            
            return updateUserSuccess({user:updatedUser})
          }
          )
        )
    })
  )
})
     // =========================================== delete user

   this.deleteUsers$ = createEffect(()=>{
   return this.actions$.pipe(
      ofType(deleteUser),
      switchMap((action)=>{
        return this._userService.deleteUser(action.id).pipe(
          map(()=>{
            return deleteUserSuccess({id:action.id})
          })
        )
      })
    )
   })




    }
   
    
    }