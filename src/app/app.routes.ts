import { Routes } from '@angular/router';
import { VideoPage } from './components/video-page/video-page';
import { sidebarGuard } from './guards/routesGuard';

export const routes: Routes = [
  { path: '', component: VideoPage, title: 'MyYoutube' },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth-page/auth-routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'profil',
    loadComponent: () => import('./components/profil-page/profil-page').then((c) => c.ProfilPage),
    title: 'Profil',
    canActivate: [sidebarGuard],
  },
  {
    path: 'favoris',
    loadComponent: () =>
      import('./components/favoris-page/favoris-page').then((m) => m.FavorisPage),
    title: 'Favoris',
    canActivate: [sidebarGuard],
  },
];
