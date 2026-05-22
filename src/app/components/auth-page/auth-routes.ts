import { Routes } from '@angular/router';
import { routesAuthGuard } from '../../guards/routesGuard';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth-page').then((m) => m.AuthPage),
    canActivate: [routesAuthGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login/login').then((m) => m.Login),
        canActivate: [routesAuthGuard],
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register').then((m) => m.default),
        canActivate: [routesAuthGuard],
      },
    ],
  },
];
