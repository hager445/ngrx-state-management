import { reqHandler } from './../../../../server';
import { HttpInterceptorFn } from '@angular/common/http';
import {  inject } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _storage = inject(StorageService);
  const token = _storage.getToken();
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }
  return next(req);
};
