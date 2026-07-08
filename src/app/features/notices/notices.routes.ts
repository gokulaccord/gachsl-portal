import { Routes } from '@angular/router';

export const NOTICE_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./pages/notice-list/notice-list.component')
        .then(m => m.NoticeListComponent)
  },

  {
    path: 'add',
    loadComponent: () =>
      import('./pages/notice-form/notice-form.component')
        .then(m => m.NoticeFormComponent)
  },

  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/notice-form/notice-form.component')
        .then(m => m.NoticeFormComponent)
  }

];