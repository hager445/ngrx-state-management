import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {  userReducer } from './store/users.reducer';
import { loadUsersEffect } from './store/users.effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideToastr(),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideHttpClient(withFetch(),withInterceptors([authInterceptor,errorInterceptor])), provideStore(),provideState({name:'users',reducer:userReducer}), provideEffects([loadUsersEffect]),provideAnimations()]
};
