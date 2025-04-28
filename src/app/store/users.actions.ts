import { createAction, props } from "@ngrx/store";
import { User } from "./users.state";

// import { createAction } from "@ngrx/store";

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[] }>());
// export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: any }>());
export const addUser = createAction('[user] add user', props<{user:User}>());
export const updateUser = createAction('[user] update user', props<{user:User}>());
export const deleteUser = createAction('[user] delete user', props<{id:string}>());
// export const increament = createAction('increament count');