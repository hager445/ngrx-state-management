import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Iuser } from '../../../shared/interfaces/iusers/iusers';
import { User } from '../../../store/users.state';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

   
  constructor(private _Http:HttpClient) { }
  getUsers():Observable<User[]>{
    return this._Http.get<User[]>(`http://localhost:3000/users`);
  }
  createUser(newUser:Iuser):Observable<any>{
    return this._Http.post(`http://localhost:3000/users`,newUser);
  }
  updateUser(user:Iuser,id:string):Observable<any>{
    return this._Http.put(`http://localhost:3000/users/${id}`,user);
  }
  deleteUser(id:string):Observable<any>{
    return this._Http.delete(`http://localhost:3000/users/${id}`);
  }

}
