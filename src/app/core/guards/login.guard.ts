import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // If user is already logged in, block login page
  if (authService.isTokenValid()) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};