import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { error, log } from 'console';
import { Iuser } from '../../shared/interfaces/iusers/iusers';
import { StorageService } from '../../core/services/storage/storage.service';
import { Router, RouterLink } from '@angular/router';
// import { Router } from 'express';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  userToken:Iuser={}as Iuser;
  messageError:string|null=null;
  loginUser!:FormGroup;
  constructor(private fb:FormBuilder , private _Router:Router, private _AuthService:AuthService, private _Storage:StorageService){

    this.loginUser = this.fb.group({  
      email:[null,Validators.required,Validators.email],
      password:[null,Validators.required],
    })
  }
  loginSubmition(){
    this._AuthService.checkUserExistance(this.loginUser.get('email')?.value,this.loginUser.get('password')?.value).subscribe({
      next:(res)=>{
       this._Storage.saveUser(res);
        this._Router.navigate(['dashboard'])
      },
      error:(error)=>{
        this.messageError = error;
      }
    })
  }
}
