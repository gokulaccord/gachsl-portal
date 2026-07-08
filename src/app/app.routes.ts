import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [

  // Public route (LOGIN)
  {
    path: 'login',
    canActivate: [loginGuard],   // 👈 IMPORTANT FIX
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent)
  },

  // Protected app
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
  path: 'members',
  loadComponent: () =>
    import('./features/members/pages/member-list/member-list.component')
      .then(m => m.MemberListComponent)
},
{
  path: 'settings',
  loadComponent: () =>
    import('./features/settings/pages/society-settings/society-settings.component')
      .then(m => m.SocietySettingsComponent)
},
{
  path: 'meetings',
  loadComponent: () =>
    import('./features/meetings/pages/meeting-list/meeting-list.component')
      .then(m => m.MeetingListComponent)
},
{
  path: 'meetings/add',
  loadComponent: () =>
    import('./features/meetings/pages/schedule-meeting/schedule-meeting.component')
      .then(m => m.ScheduleMeetingComponent)
},
{
  path: 'meetings/edit/:id',
  loadComponent: () =>
    import('./features/meetings/pages/schedule-meeting/schedule-meeting.component')
      .then(m => m.ScheduleMeetingComponent)
},
{
  path: 'notices',
  loadChildren: () =>
    import('./features/notices/notices.routes')
      .then(routes => routes.NOTICE_ROUTES)
}
    ]
  },

  // fallback
  {
    path: '**',
    redirectTo: 'login'
  }
];