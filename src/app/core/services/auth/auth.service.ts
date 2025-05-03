import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Iuser } from '../../../shared/interfaces/iusers/iusers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _Http:HttpClient) { }
  checkUserExistance(email:string,password:string):Observable<any>{
    return this._Http.get<Iuser[]>(`http://localhost:3000/users?email=${email}&password=${password}`).pipe(
      map((res)=>{
       if (res.length > 0) {
         return {...res[0] , token: `${res[0].id}-${Date.now()}-${Math.floor(Math.random() * 10000)}`}
        
       }else{
        throw new Error('This user does not exist. Please register first!');
      }
          
      }),
      catchError(
        (error)=>
        {         
          return throwError(() => new Error(error.message));  
        }
      )
    )
  }
}
