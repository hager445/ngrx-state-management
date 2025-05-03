import { Routes } from '@angular/router';

import { UsersListComponent } from './features/users/users-list/users-list.component';
import { UsersFormComponent } from './features/users/users-form/users-form.component';
import { DashboardShellComponent } from './features/dashboard/dashboard-shell/dashboard-shell.component';
import { LiveCounterComponent } from './features/dashboard/live-counter/live-counter.component';
import { ChartComponent } from './features/dashboard/chart/chart.component';
import { ToastContainerComponent } from './features/notifications/toast-container/toast-container.component';
import { NotificationPanelComponent } from './features/notifications/notification-panel/notification-panel.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // ✅ Layout خاص بالـ Auth (Login, Register)
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
      {
path:'',
loadComponent:()=> import('./layouts/authantication/authantication.component').then(c=>c.AuthanticationComponent)
, children:[{
  path: 'login',
  loadComponent: () => import('./layouts/auth/auth.component').then(c => c.AuthComponent),

},
{
  path: 'register',
  loadComponent: () => import('./features/users/users-form/users-form.component').then(c => c.UsersFormComponent),

},
]
      }
    ,
    


  // ✅ Layout خاص بالـ Main App (Dashboard, Users, Notifications)
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
     // ✅ حراسة على كل الابن routes
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard-shell/dashboard-shell.component').then(c => c.DashboardShellComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/users/users-list/users-list.component').then(c => c.UsersListComponent)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./features/notifications/toast-container/toast-container.component').then(c => c.ToastContainerComponent)
      },
     
    ]
  },

  // ✅ أي Route غلط
  { path: '**', redirectTo: '' }
];
