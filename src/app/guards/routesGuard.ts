import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const routesAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return !authService.isConnected();
};

export const sidebarGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isConnected();
};
