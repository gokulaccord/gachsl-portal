import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Guard - token valid:', authService.isTokenValid());

  if (authService.isTokenValid()) {
    return true;
  }

  authService.logout();
  return false;
};