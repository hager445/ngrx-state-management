// // This file will contain the initial state of our application


import { createReducer, on } from "@ngrx/store";
import { addUser, addUserSuccess, deleteUser, deleteUserSuccess, loadUsersSuccess, updateUser, updateUserSuccess } from "./users.actions";
import { User } from "./users.state";
import { Iuser } from "../shared/interfaces/iusers/iusers";

//  and the reducer function that handles state changes
export interface AppState{
    users:Iuser[],
    loading:boolean,
    error:boolean
}
export const initialState:AppState = {
users:[],
loading:false,
error:false
}
// ====================== reducer:
export const userReducer = createReducer(
    initialState,
    on(loadUsersSuccess, (state,{users})=>({...state,users:users})),
    on(addUserSuccess,
         (state, { user }) => ({
      ...state,
      users: [...state.users, user]
    }
)),
on(updateUserSuccess,(state,{user}) =>(
    {...state ,  users: state.users.map(u=>{
      return  u.id === user.id ? user : u
    })}
)
),
on(deleteUserSuccess,(state,{id})=>(
    {...state, users: state.users.filter(u=>u.id !== id)}
))
  )
  
