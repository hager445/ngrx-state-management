import {  Component, effect, signal } from '@angular/core';

import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';


import { strongPassword } from '../../../shared/validators/users-formvalidators';

import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/users.reducer';
import { addUser, updateUser } from '../../../store/users.actions';

import { checkEmail } from '../../../shared/validators/emailAsyncValidator';
import { UpdatemodeService } from '../../../core/services/updatemode/updatemode.service';
import { Router } from '@angular/router';
import { Iuser } from '../../../shared/interfaces/iusers/iusers';
import { FormModalDirective } from '../../../shared/directives/formModal/form-modal.directive';
import { ModalService } from '../../../core/services/modal/modal.service';




@Component({
  selector: 'app-users-form',
  imports: [ReactiveFormsModule,FormModalDirective],
  templateUrl: './users-form.component.html',


  styleUrl: './users-form.component.css'
})
export class UsersFormComponent {
  
  formG!:FormGroup;
  messageError:string | null =null;

 
  constructor(private _Modal: ModalService,private _Router:Router,private store:Store<AppState>, private fb:FormBuilder  , private _Http:HttpClient , public _UpdateModeService:UpdatemodeService) {
    // ============ Initailize form group: 

    
  
effect(()=>{
  
    if (_UpdateModeService.userInfo().id) {
      this.showUserInfoInForm();
    }else{
    
      this.formG.reset();

    }
    
})



    // ============
    this.formG = this.fb.group(
      {
        name:[null,[Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z\s]+$/)]],
        email:[null, [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)],
          
         
           
        
        ]
        ,
        password:[null,[Validators.required,strongPassword]],
        role:['select a role',[Validators.required]],
        createdAt:[null,[Validators.required]],
      }
    )
  }

    
    
    
  
// ========= handle user update
  
  updateUserForm(){
  
    if (!this.formG.valid) {
      this.messageError = 'please fill out the empty fields!'
      console.log(this.formG);
      
      return};
      
      this.store.dispatch(updateUser({user:this.formG.value,id:this._UpdateModeService.userInfo().id}));
      this.messageError = ''
      this.resetAll()
    }
  
   showUserInfoInForm(){
    this.formG.patchValue(this._UpdateModeService.userInfo());
     this.formG.get('email')?.setAsyncValidators(checkEmail(this._Http, this._UpdateModeService.userInfo().email));
    this.formG.get('email')?.updateValueAndValidity();
   }
  
   get isUpdateMode() {
    return this._UpdateModeService.setUpdateMode(); // مثلاً Method بيرجع القيمة فقط
  }
  
//  =====================================
// handle first register:
  registerSubmition(){
    if (!this.formG.valid) {
      this.messageError = 'please fill out the empty fields!'
      console.log('not valid user',this.formG.value);
      return};
      
      console.log('valid user',this.formG.value);
      
      this.store.dispatch(addUser({user:this.formG.value}))
    
      this.messageError = ''
      this.resetAll()
   this._Router.navigate(['/login'])
    }
 
    
    resetAll(){
      this._UpdateModeService.setAddMode() ;
      this.formG.reset();
}
// ===================== handle closing model:
closeModal(){
  this._Modal.closeModal()
  }
}