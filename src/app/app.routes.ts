import { Routes } from '@angular/router';
import { VideoPage } from './components/video-page/video-page';

export const routes: Routes = [
  { path: '', component: VideoPage, title: 'MyYoutube' },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth-page/auth-routes').then((m) => m.AUTH_ROUTES),
  },


];
