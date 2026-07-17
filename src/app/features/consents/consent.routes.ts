import { Routes } from '@angular/router';

export const CONSENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/consent-list/consent-list.component')
        .then(m => m.ConsentListComponent)
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/consent-form/consent-form.component')
        .then(m => m.ConsentFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/consent-form/consent-form.component')
        .then(m => m.ConsentFormComponent)
  }
];