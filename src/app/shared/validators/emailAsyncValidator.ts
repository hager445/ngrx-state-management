
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsersService } from '../../core/services/users/users.service';
// import { Iuser } from '../iusers/iusers';
import { HttpClient } from '@angular/common/http';
export function checkEmail(http:HttpClient , currentEmail:string): AsyncValidatorFn {
 
    return  (control:AbstractControl):Observable<any>=>{
      
        const email = (control.value || '').trim().toLowerCase();  
     if ( email === currentEmail) {
        return of(null);
     }
    return of(email).pipe(
       
        switchMap(
            (email)=>{
               return http.get<any[]>(`http://localhost:3000/users?email=${email}`).pipe(
                map((users)=> {
                    return users.length > 0 ? { 'existEmail': true } : null;
                }),
                catchError(()=> of(null))
            )
        }
    )
    )
    
}

}


