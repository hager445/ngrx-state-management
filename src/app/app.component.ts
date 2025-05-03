// import { AppState, Count, userReducer } from './store/users.reducer';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

import { ScrollingModule } from '@angular/cdk/scrolling';


import { Inject, PLATFORM_ID } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { UsersListComponent } from './features/users/users-list/users-list.component';
import { DashboardShellComponent } from './features/dashboard/dashboard-shell/dashboard-shell.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from "./layouts/auth/auth.component";
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
// import { AuthComponent_1 as AuthComponent } from "./layouts/auth/auth.component";

@Component({
  selector: 'app-root',
  imports: [ScrollingModule, RouterOutlet, RouterLink,MainLayoutComponent, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  private platformId = Inject(PLATFORM_ID);

constructor(){

}
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Browser detected!');
      initFlowbite(); // أو أي كود فيه document/window
    }}



  }