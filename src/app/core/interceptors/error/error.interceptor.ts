import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';  // تأكد من استيراد ToastrService
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _Toaster = inject(ToastrService);  // استخدام ToastrService لعرض الإشعارات
  return next(req).pipe(
    retry(3),
    catchError((err)=>{
    return throwError(()=>_Toaster.error(err.message))
      }));
};
