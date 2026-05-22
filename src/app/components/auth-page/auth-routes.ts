import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth-page').then((m) => m.AuthPage),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register').then((m) => m.default),
      },
    ],
  },
];
