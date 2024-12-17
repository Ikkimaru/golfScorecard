import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserDataService } from './services/user-data.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userDataService = inject(UserDataService);
  const router = inject(Router);

  // Check if user is logged in
  if (userDataService.isLoggedIn()) {
    return true;
  } else {
    // Redirect to login if not logged in
    router.navigate(['/login']);
    return false;
  }
};
