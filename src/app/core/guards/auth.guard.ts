import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
 const _StorageService = inject(StorageService);
 const token = _StorageService.getToken();
 const router = inject(Router);

 if (!token) {
  router.navigate(['login'])
  return false;
 }
  return true;
};
