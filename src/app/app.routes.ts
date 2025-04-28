import { Routes } from '@angular/router';

import { UsersListComponent } from './features/users/users-list/users-list.component';
import { UsersFormComponent } from './features/users/users-form/users-form.component';
import { DashboardShellComponent } from './features/dashboard/dashboard-shell/dashboard-shell.component';
import { LiveCounterComponent } from './features/dashboard/live-counter/live-counter.component';
import { ChartComponent } from './features/dashboard/chart/chart.component';
import { ToastContainerComponent } from './features/notifications/toast-container/toast-container.component';
import { NotificationPanelComponent } from './features/notifications/notification-panel/notification-panel.component';

export const routes: Routes = [

  {
    path: 'users',
    loadComponent: () => import('./features/users/users-list/users-list.component').then(c => c.UsersListComponent)
  },
  {
    path: 'users/create',
    loadComponent: () => import('./features/users/users-form/users-form.component').then(c => c.UsersFormComponent)
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./features/users/users-form/users-form.component').then(c => c.UsersFormComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard-shell/dashboard-shell.component').then(c => c.DashboardShellComponent)
  },
  {
    path: 'notifications',
    loadComponent: () => import('./features/notifications/toast-container/toast-container.component').then(c => c.ToastContainerComponent)
  },
  {
    path: 'notifications/settings',
    loadComponent: () => import('./features/notifications/notification-panel/notification-panel.component').then(c => c.NotificationPanelComponent)
  },
  { path: '', redirectTo: '/users', pathMatch: 'full' }
];