

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./users.reducer";
import { User } from "./users.state";


export const selectUserFeature = createFeatureSelector<AppState>('users');
export const selectUsers = createSelector(selectUserFeature, state => state.users);
