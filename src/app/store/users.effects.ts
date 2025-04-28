
import { Injectable } from "@angular/core";
import { loadUsers, loadUsersSuccess } from "./users.actions";
import { createEffect,Actions, ofType } from "@ngrx/effects";
import {  map, switchMap } from 'rxjs';
import { UsersService } from '../core/services/users/users.service';

@Injectable()
export class loadUsersEffect{
    constructor(private actions$:Actions, private _userService:UsersService){}
    loadUsers$ = createEffect(()=>{
        // to listen all actions
      return  this.actions$.pipe(
        // specific action
         ofType(loadUsers),
         switchMap(()=>{
    return this._userService.getUsers().pipe(
    map((users)=>loadUsersSuccess({users}))
)})
         )
        })
    }