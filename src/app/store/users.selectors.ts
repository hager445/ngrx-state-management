

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./users.reducer";



export const selectUserFeature = createFeatureSelector<AppState>('users');
export const selectUsers = createSelector( selectUserFeature, state => state.users);
