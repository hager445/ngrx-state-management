import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import{FlowbiteService} from '../../../core/services/flowbite/flowbite.service'; // التأكد من أن flowbite متاحة
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators, FormControl } from '@angular/forms';
import {  Router } from '@angular/router';
import { ModalService } from '../../../core/services/modal/modal.service';
import { strongPassword } from '../../../shared/validators/users-formvalidators';
import { checkEmail } from '../../../shared/validators/emailAsyncValidator';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../../core/services/users/users.service';
import { map, switchMap } from 'rxjs';


@Component({
  selector: 'app-users-form',
  imports: [ReactiveFormsModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css'
})
export class UsersFormComponent {
  updateUser!:FormGroup;
  messageError:string='';
  id!:string;
  @ViewChild('modal') modal!:ElementRef<HTMLElement>
  constructor( private fb:FormBuilder ,private  _Renderer:Renderer2 , private _Http:HttpClient , private _Users:UsersService) {

    // ============ Initailize form group: 
    this.updateUser = this.fb.group(
      {
        name:[null,[Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z\s]+$/)]],
        email:[null,[Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)],checkEmail(this._Http)],
        password:[null,[Validators.required,strongPassword]],
        role:[null,[Validators.required]],
        createdAt:[null,[Validators.required]],
      }
    )
  
   
  }

  
 
  registerSubmition(){
    console.log(this.updateUser.value);
    if (!this.updateUser.valid) {
      this.messageError = 'please fill out the empty fields!'
      
      return};
    this._Users.createUser(this.updateUser.value).subscribe((res)=>{
      console.log(res);
      
    })
     this.updateUser.reset();
  }

}
