import { Routes } from '@angular/router';

export const DOCUMENT_ROUTES: Routes = [

  {
    path:'',
    loadComponent:() =>
      import('./pages/document-list/document-list.component')
      .then(m=>m.DocumentListComponent)
  },

  {
    path:'add',
    loadComponent:() =>
      import('./pages/document-form/document-form.component')
      .then(m=>m.DocumentFormComponent)
  },

  {
    path:'edit/:id',
    loadComponent:() =>
      import('./pages/document-form/document-form.component')
      .then(m=>m.DocumentFormComponent)
  }

];