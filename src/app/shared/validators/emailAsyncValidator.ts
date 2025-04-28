import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { catchError, debounceTime, first, map, Observable, of, switchMap } from "rxjs";

export function checkEmail(http:HttpClient):any{

  return  (control:AbstractControl):Observable<{[key:string]:boolean}|null>=>{
      
        const email = control.value;
        if (!email) {
            return of(null); 
          }
        return of(email).pipe(
            debounceTime(500),
            switchMap(()=>
                 http.get<any[]>(`http://localhost:3000/users?email=${email}`).pipe(
                    map(users=>{
                        if (users.length > 0) {
                            console.log(users);
                            
                            return {'emailTaken':true}
                        }
                        else{
                            return null;
                        }
                    }),
                    catchError(()=>of(null))
                 )
            )
            , 
            first()
        )
    }
}