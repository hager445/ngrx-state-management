// // This file will contain the initial state of our application


import { createReducer, on } from "@ngrx/store";
import { addUser, deleteUser, loadUsersSuccess, updateUser } from "./users.actions";
import { User } from "./users.state";

//  and the reducer function that handles state changes
export interface AppState{
    users:User[],
}
export const initialState:AppState = {
users:[]
}
// ====================== reducer:
export const userReducer = createReducer(
    initialState,
    on(loadUsersSuccess, (state,{users})=>({...state,users:users})),
    on(addUser,
         (state, { user }) => ({
      ...state,
      users: [...state.users, user]
    }
)),
on(updateUser,(state,{user}) =>(
    {...state ,  users: state.users.map(u=>{
      return  u.id === user.id ? user : u
    })}
)
),
on(deleteUser,(state,{id})=>(
    {...state, users: state.users.filter(u=>u.id !== id)}
))
  )
  
