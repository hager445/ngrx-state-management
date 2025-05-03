import { createAction, props } from "@ngrx/store";

import { Iuser } from "../shared/interfaces/iusers/iusers";

// import { createAction } from "@ngrx/store";

export const loadUsers = createAction('[user] Load Users');
export const loadUsersSuccess = createAction('[user] Load Users Success', props<{ users: Iuser[] }>());
// export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: any }>());
export const addUser = createAction('[user] add user', props<{user:Iuser}>());
export const addUserSuccess = createAction('[user] add user success', props<{user:Iuser}>());
export const updateUser = createAction('[user] update user', props<{user:Iuser,id:string}>());
export const updateUserSuccess = createAction('[user] update user success', props<{user:Iuser}>());
export const deleteUser = createAction('[user] delete user', props<{id:string}>());
export const deleteUserSuccess = createAction('[user] delete user success', props<{id:string}>());
// export const increament = createAction('increament count');